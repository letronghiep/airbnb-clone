'use client'
import {useCallback, useState} from 'react'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '~/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '~/app/hooks/useLoginModal'
type Props = {}

function RegisterModal({}: Props) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`/api/register`, data);
            registerModal.onClose();
        } catch (error) {
            toast.error("Something went wrong")
        } finally { 
            setIsLoading(false);
        }
    }
    const toggleModal = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    },[loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' />
            <Input 
            id='email' 
            label='Email' 
            disabled={isLoading} 
            register={register} 
            errors={errors} 
            required  
            />
            <Input 
            id='name' 
            label='Name' 
            disabled={isLoading} 
            register={register} 
            errors={errors} 
            required  
            />
            <Input 
            id='password' 
            type='password'
            label='Password' 
            disabled={isLoading} 
            register={register} 
            errors={errors} 
            required  
            />
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button  
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button  
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex justify-center items-center gap-2">
                    <p>Already have an account</p>
                    <p 
                    className="text-neutral-800 cursor-pointer hover:underline"
                    onClick={toggleModal}
                    >Log in</p>
                </div>
            </div>

        </div>

    )
  return (
    <Modal 
        isOpen={registerModal.isOpen}
        disabled={isLoading}
        onClose={registerModal.onClose}
        title='Register'
        actionLabel='Continue'
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal