import React,{useState,useRef,useEffect} from 'react';
import './Message.scss';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import getCurrentTime from '../Helper/helper'

import wave from '../../Assets/wave.svg'


const MessageAudio = ({audio})=>{


    const[isPlay,setPlay] = useState(false)
    const[progress,setProgress] = useState(0)
    const[time,setTime] = useState(0)
    const audioElem  = useRef(null)


    useEffect(()=>{
        audioElem.current.addEventListener(
            'playing',
            ()=>{
                setPlay(true)
            },
            false
        );
        audioElem.current.addEventListener(
            'ended',
            ()=>{
                setProgress(0)
                setPlay(false)
                setTime(0)
            },
            false
        );
        audioElem.current.addEventListener(
            'pause',
            ()=>{
                setPlay(false)
            },
            false
        );
        audioElem.current.addEventListener(
            'timeupdate',
            ()=>{
                const duration = (audioElem && audioElem.current.duration ) || 0;
                setTime(audioElem.current.currentTime);
                setProgress(audioElem.current.currentTime / duration * 100)
            },
            false
        );
    },[])

    const togglePlay = ()=>{
        if(!isPlay) {
            audioElem.current.play()
        } else{
            audioElem.current.pause()
        }

    }

    return(

              <>
                  {
                      audio &&
                        <div className='message__audio'>
                            <audio ref = {audioElem} src={ audio} preload='auto'></audio>
                            <div className="message__audio-progress" style ={{width: progress + "%"}}></div>
                            <div className="message__audio-info">
                                <div className="message__audio-btn">
                                    <button onClick={togglePlay}>
                                        {isPlay ? <PauseIcon fontSize='small'/> : <PlayArrowIcon fontSize='small'/>  }
                                    </button>
                                </div>
                                <div className="message__audio-wave">
                                    <img src={wave} alt="Wave img"/>
                                </div>
                                <span className="message__audio-duration">
                                       {getCurrentTime(time)}
                                   </span>
                            </div>

                        </div>

                        }
                  </>

    )}

    export default MessageAudio;

