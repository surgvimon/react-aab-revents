import React from 'react'
import { useSelector } from 'react-redux';
import TestModal from '../../../features/sanbox/TestModal';
import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';
import ChatFrom from '../../../features/events/eventFrom/ChatFrom';

export default function ModalManager() {
    const modalLookup = {
        TestModal,
        LoginForm,
        RegisterForm,
        ChatFrom
    };
    const currentModal = useSelector((state) => state.modals);
    let renderedModal;
    if(currentModal){
        const {modalType, modalProps} = currentModal;
        const ModalComponent = modalLookup[modalType];
        renderedModal = <ModalComponent {...modalProps}/>
    }
  return (
    <span>{renderedModal}</span>
  )
}
