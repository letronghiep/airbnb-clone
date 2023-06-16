'use client'
import {useCallback, useState} from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useRegisterModal from '~/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '~/app/hooks/useLoginModal'


function LoginModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
          const callback =   await signIn('credentials', {
                ...data,
                redirect: false
            })
            setIsLoading(false);
            if(callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error) {
                toast.error(callback.error)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subTitle='Login to your account' />
            <Input 
            id='email' 
            label='Email' 
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
                    <p>First time using Airbnb?</p>
                    <p 
                    className="text-neutral-800 cursor-pointer hover:underline"
                    onClick={toggleModal}
                    >Create an account</p>
                </div>
            </div>

        </div>

    )
  return (
    <Modal 
        isOpen={loginModal.isOpen}
        disabled={isLoading}
        onClose={loginModal.onClose}
        title='Login'
        actionLabel='Continue'
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal