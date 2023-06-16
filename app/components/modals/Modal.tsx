'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import Button from '../Button';
type Props = {
  isOpen?: boolean,
  onClose: () => void,
  onSubmit: () => void,
  title?: string,
  body?: React.ReactElement,
  footer?: React.ReactElement,
  actionLabel: string,
  disabled?: boolean,
  secondaryAction?: () => void,
  secondaryActionLabel?:string
}

function Modal({
  isOpen,
  title,
  disabled,
  onClose,
  onSubmit,
  body,
  actionLabel,
  footer,
  secondaryAction,
  secondaryActionLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if(disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled])
  const handleSubmit = useCallback(() => {
    if(disabled) return;
    onSubmit()
  }, [onSubmit, disabled])
  const handleSecondaryAction = useCallback(() => {
    if(disabled || !secondaryAction) return;
    secondaryAction()

  }, [secondaryAction, disabled]);
  if(!isOpen) return null
  return (
    <div className='
    flex 
    justify-center 
    items-center 
    overflow-hidden 
    fixed 
    top-0 
    bottom-0 
    left-0 
    right-0 
    bg-neutral-800/70 
    z-50 
    outline-none 
    focus:outline-none
    inset-0
    '>
        <div className='
        relative 
        w-full 
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
        '>
          {/* Content */}
          <div 
          className={`
          translate
          duration-300
          h-full
          ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}>
            <div 
            className="
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none    
            ">
              {/* Header */}
              <div 
              className="
              flex
              items-center
              p-5
              rounded-t
              justify-center
              relative
              border-b-[1px]
              ">
                <button
                  className='
                      transition
                      absolute
                      left-4
                      p-1
                      border-0
                      hover:opacity-80
                      '
                  onClick={handleClose}
                >
                <IoMdClose size={18}  />

                </button>
                <h1 className="font-bold text-lg">
                {title}
                </h1>

              </div>
              {/* Body */}
              <div
                className="
                relative
                p-6
                flex-auto
                "
                >
                {body}

              </div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    {
                      secondaryAction && secondaryActionLabel && (
                        <Button 
                        disabled={disabled}  
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                        outline
                        
                        />

                      )

                    }
                    <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                    />
                  </div>
                  {footer}
              </div>
            </div>
          </div>

        </div>




    </div>
  )
}

export default Modal