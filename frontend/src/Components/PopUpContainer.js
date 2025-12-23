import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LoginPopUp from './LoginPopUp'
import ConfirmEmailPopUp from './ConfirmEmailPopUp'
import RegisterPopUp from './RegisterPopUp'
import HireCouncellorPopUp from './HireCouncellorPopUp';

const defaultProps = {
    showPopUp:false,
    reason :"Hire councelor"
}
const PopUpContainer = ({showPopUp=defaultProps.showPopUp,setShowPopUp,reason= defaultProps.reason}) => {
    const [regiseterPopUp, setRegisterPopUp] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [loginPopUp, setLoginPopUp] = useState(false);
    const [schedulePopUp, setSchedulePopUp] = useState(false);
    const {authenticated} = useSelector(state=>state.authentication);

    useEffect(()=>{
        if(authenticated){
            setSchedulePopUp(true);
            setConfirmEmail(false);
            setLoginPopUp(false);
            setRegisterPopUp(false)
        }
        else{
            setSchedulePopUp(false);
            setConfirmEmail(false);
            setLoginPopUp(false);
            setRegisterPopUp(true)
        }
    },[showPopUp,authenticated])

  return (
    <div className={showPopUp ? "block":"hidden"}>
        {
            loginPopUp && <LoginPopUp setRegisterPopUp={setRegisterPopUp} setLoginPopUp={setLoginPopUp} setSchedulePopUp={setSchedulePopUp} showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>
        }
        {
            confirmEmail && <ConfirmEmailPopUp setSchedulePopUp={setSchedulePopUp} setConfirmEmail={setConfirmEmail} setLoginPopUp={setLoginPopUp} showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>
        }
        {
            regiseterPopUp && <RegisterPopUp setLoginPopUp={setLoginPopUp} setShowPopUp={setShowPopUp} showPopUp={showPopUp} setRegisterPopUp={setRegisterPopUp} setConfirmEmail={setConfirmEmail}/>
        }
        {
            schedulePopUp && <HireCouncellorPopUp showPopUp={showPopUp} setSchedulePopUp={setSchedulePopUp} setShowPopUp={setShowPopUp} reason={reason}/>
        }
    </div>
  )
}

export default PopUpContainer