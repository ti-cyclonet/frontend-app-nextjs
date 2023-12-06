import { useState, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

//redux
import { clearSessionUser } from "../../redux/states/userState";
import { useDispatch } from 'react-redux';


import { Modal, Button } from 'react-bootstrap';
/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */
export const useIdleSessionTimeout = ({ onPrompt, onIdle, idleTime = 1, promptBeforeTime = 30 }) => {


    const [isIdle, setIdle] = useState(false)

    const dispatch = useDispatch();

    const idleTimer = useIdleTimer({
        timeout: 1000 * idleTime,
        promptBeforeIdle: 1000 * promptBeforeTime,
        onPrompt: onPrompt,
        onIdle: onIdle,
        debounce: 500,        
    })

    return {
        isIdle,
        setIdle,
        promptBeforeTime,
        idleTimer
    }
}