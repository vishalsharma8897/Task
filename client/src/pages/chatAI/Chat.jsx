import React, { useState, useEffect } from 'react'
import './Chat.css';
import Navbar from '../../components/navbarAI/Navbar';
import UserMessage from '../../components/UserMassageAI/UserMessage';
import BotMessage from '../../components/BotMessage/BotMessage';
import arrow from '../../assets/Shape.png';
import axios from 'axios';
import { getAllAIMessagesRoute, getBotMessageRoute } from '../../utils/api';
import { sendUserMessageRoute } from '../../utils/api';
import person from '../../assets/person.png';
import iconpause from '../../assets/icon-pause.png'
import iconstart from '../../assets/Vector (1).png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom'
import DummyMessages from '../../DummyMessages';
import { useSpeechSynthesis } from 'react-speech-kit';
import listen from '../../assets/listen.png'

const Chat = () => {

    const [id, setId] = useState(undefined);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    const [text,setText] = useState('');
    const [isPlayingAudio, setIsPlayingAudio] = useState(false); 
    const navigate = useNavigate();
    const {speak} = useSpeechSynthesis();



    useEffect(() => {
        const getId = async () => {
            if (!localStorage.getItem('user')) {
                navigate('/');
            }
            else {
                const data = await JSON.parse(
                    localStorage.getItem('user')
                )
                setId(data._id);
            }
        }
        getId();
    }, [])

    useEffect(() => {
        async function fetchAllMsgs() {
            if (id) {
                try {
                    const { data } = await axios.post(getAllAIMessagesRoute, { id });
                    if (data.success) {
                        setMessages(data.newMessages);
                    }
                    else {
                        console.log("Error in fetching data");
                    }
                } catch (error) {
                    alert("Internal Client Error ", error);
                }
            }

        }
        fetchAllMsgs();
    }, [id]);


    useEffect(() => {
        const addDummyMessages = async () => {
            if (messages.length === 0) {
                setMessages((prevMessages) => [...prevMessages, ...DummyMessages]);
            }
        };
        addDummyMessages();
    }, [messages]);


    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        // Update the input state when there is a new transcript
        setInput(transcript);
    }, [transcript]);

    const listenText = () => {
        setIsPlayingAudio(true);
        const lastMessage = messages[messages.length - 1].message;
        setText(lastMessage);
      
        speak({
          text: lastMessage,
          onEnd: () => setIsPlayingAudio(false),
          onStart: () => console.log('Speech started'), // Optional: Log when speech starts
          onError: (error) => {
            console.error('Speech synthesis error:', error);
            setIsPlayingAudio(false); 
          },
        });
      };
      
      const stopSpeaking = () => {
        setIsPlayingAudio(false);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // Cancel the ongoing speech synthesis
        }
      };
      
      
      

    const startListening = async () => {
        setIsListening(true);
        await startCamera();
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        stopCamera();
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoStream(stream);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
        }
    };


    if (!browserSupportsSpeechRecognition) {
        return null;
    }


    const handleOnEnter = async (e) => {
        try {
            let msgObj = {
                message: input,
                userId: id
            };
            // add the new message to existing messages and scroll down to show it
            var { data } = await axios.post(sendUserMessageRoute, msgObj);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, { isAIgenerated: false, message: input }]);

                let botReqMsg = {
                    userId: id,
                    message: input,
                }
                const { data } = await axios.post(getBotMessageRoute, botReqMsg);
                setMessages((prevMessages) => [...prevMessages, { isAIgenerated: true, message: data.message }]);
                setText(data.message);
                setInput('');

            }
            else {
                console.log("Msg could not get added due to server errror");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className='chat-page'>
            <Navbar />
            { isPlayingAudio &&  <div className="SpeechToText">
                <div className="person-start-listen">
                    <div className="person-img">
                        {isListening && videoStream && (
                            <video ref={(ref) => ref && (ref.srcObject = videoStream)} autoPlay />
                        )}
                        {!isListening && <img src={person} className="person-img" alt="" />}
                    </div>
                </div>
                <div className="stop-btn">
                    <button onClick={stopSpeaking}>
                        <img src={iconpause} alt="" />
                    </button>
                    <p className='btn-text'>Stop Speaking</p>
                </div>
            </div>}
            <div className="chat-container">
                <div className="chat-msg-box">
                    {
                        messages.map((item, index) => {
                            if (!item["isAIgenerated"]) {
                                return (
                                    <UserMessage key={index} message={item.message} />
                                )
                            } else {
                                return (
                                    <BotMessage key={index} message={item.message} />
                                )
                            }
                        })
                    }
                </div>
                <div className="chat-input-box">
                    <input placeholder="Type your message here..."
                        name='input'
                        onChange={handleOnChange}
                        value={input}
                        className='chat-input'
                    >
                    </input>
                    <div className="side">
                        <button onClick={listenText} className='chat-input-btn'>
                            <img src={listen} alt="Listen" />
                        </button>
                        <button onClick={(e) => handleOnEnter()}
                        className='chat-input-btn'
                    >
                        <img src={arrow} alt="" />
                    </button>
                    </div>
                </div>
            </div>
           { !isPlayingAudio &&  <div className="SpeechToText">
                <div className="person-start-listen">
                    <div className="person-img">
                        {isListening && videoStream && (
                            <video ref={(ref) => ref && (ref.srcObject = videoStream)} autoPlay />
                        )}
                        {!isListening && <img src={person} className="person-img" alt="" />}
                    </div>

                    <div className="start-btn-speech" >
                        <button onClick={startListening}>
                            <img src={iconstart} alt="" />
                        </button>
                        <p className='btn-text'>video</p>
                    </div>
                </div>
                <div className="stop-btn">
                    <button onClick={stopListening}>
                        <img src={iconpause} alt="" />
                    </button>
                    <p className='btn-text'>Stop Speaking</p>
                </div>
            </div>}
        </div>
    )
}

export default Chat
