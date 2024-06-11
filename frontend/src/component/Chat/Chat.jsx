import { useState , useEffect , useRef } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { AddChatMessage } from "../../libs/post";
import io from 'socket.io-client';

export default function Chat(data) {
const [chatmessage , setChatmessage] = useState(data.chatmessage);
const [userTyping , setUserTyping] = useState(false);
const [filepreview , setFilepreview] = useState([]);
const [files , setFiles] = useState([]);
const [ErrorFile , setErrorFile] = useState(false);
const [ErrorMaxFile , setErrorMaxFile] = useState(false);
const [LocalMessage , setLocalMessage] = useState("");

 
let token = localStorage.getItem('token');
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const typingTimeoutRef = useRef(null);

  
    useEffect(() => {
        const socket = io('http://localhost:3000', {
            auth: {
              token: token,
            },
            query: {
              "userId": data.user.id,
              "companyId": data.entreprise.id,
              "offreId": data.offreid,
            }
          });
    
        
        socketRef.current = socket;
        socketRef.current.on('GetMessage', (message) => {
                if(message === "problème dans l'update") {
                    return;
                }
                else if (chatmessage.message === "pas de messages") {
                    setChatmessage("")
                    setLocalMessage("");
                    setChatmessage(message);
                    scroll.scrollToBottom({
                        containerId: 'messageList'
                    }, {smooth: false , duration: 0});
                }
                setLocalMessage("");
             setChatmessage(message);
            });
            
            socketRef.current.on('GettypingActive', (typing) => {
            
                if(typing === "typing") {
                    setUserTyping(true);
                    clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = setTimeout(() => {
                      setUserTyping(false);
                    }, 2000);
                }
                else {
                    return;
                }
            });
    setChatmessage(chatmessage); 
setTimeout(() => {
    scroll.scrollToBottom({
        containerId: 'messageList'
    }, {smooth: false , duration: 0});
}, 100);

    return () => socket.disconnect()
    },[chatmessage]);


const handleActive = () => {
    let message = document.querySelector('#inputmessage').value;
    if(message === "") {
        return;
    }
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socketRef.current.emit('typingActive', "typing");
      typingTimeoutRef.current = setTimeout(() => {
        setUserTyping(false);
      }, 2000);
    };

    const TransformDate = (date) => { 
      
        let newDate = new Date(date);
        let day = newDate.getDate(); 
        let monthIndex = newDate.getMonth(); 
        let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        let monthName = months[monthIndex]; 
        return `${day} ${monthName}`;
    }

const Addmessage = async () => {
    let message = document.querySelector('#inputmessage').value;
    if(message === "") {
        return;
    }
    setUserTyping(false);
    let Newmessage = {  
        message: message,
        sender: data.connected,
    };
    let ChatData = new FormData();
    ChatData.append('message', message);
    ChatData.append('userId', data.user.id);
    ChatData.append('companyId', data.entreprise.id);
    ChatData.append('offreId', data.offreid);
    ChatData.append('sender', data.connected);
    files.forEach(file => {
        ChatData.append('files', file);
    });
    document.querySelector('#inputmessage').value = "";
    let response = await AddChatMessage(ChatData);
    if(response.message === "message envoyé") {
        if(chatmessage.message === "pas de messages") {
            setChatmessage("")
            socketRef.current.emit('SendMessage', "new message");
            Newmessage.createdAt = new Date();
            setLocalMessage([... LocalMessage, Newmessage]);
        }
    if(files.length > 0) {
    let filenumber = 1;
    files.forEach(file => {
        Newmessage[`file${filenumber}`] = file.name;
        const fileURL = window.URL.createObjectURL(file);
        Newmessage[`file${filenumber}url`] = fileURL;
        filenumber++;
    });
    }

        socketRef.current.emit('SendMessage', "new message");
        Newmessage.createdAt = new Date();
setLocalMessage([... LocalMessage, Newmessage]);
scroll.scrollToBottom({
    containerId: 'messageList'
}, {smooth: false , duration: 0});

    }

    setFiles([]);
    setFilepreview([]);
}

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        Addmessage();
    }
  };

    const AddImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorFile(true);
                setTimeout(() => {
                    setErrorFile(false);
                }, 3000);
            } else {
                if(files.length > 3) {
                    setErrorFile(true);
                    setTimeout(() => {
                        setErrorMaxFile(false);
                    }, 3000);
                    return;
                }
                files.push(file);
               
                let urlfile = URL.createObjectURL(file);
            
                setFilepreview([...filepreview, { url: urlfile, name: file.name }]);
            }
      };
    };

const DelImage = (event) => {
    let urlfile = event.target.id;
    let filename = event.target.dataset.filename;
  
    setFilepreview(filepreview.filter(file => file.url !== urlfile));
    setFiles(files.filter(file => file.name !== filename));
  
};


const VerifyFileExt = (file) => {
    let ext = file.split('.').pop();
    if (ext === "jpg" || ext === "jpeg" || ext === "png") {
        return "image";
    } else if(ext === "pdf" || ext === "doc" || ext === "docx") {
        return "document";
    }
}

const handleDownload = (event) => {
    let file = event.target.id;
    let ext = file.split('.').pop();
    fetch(`/chats/${file}`).then((response) => {
     response.blob().then((blob) => {
         const fileURL =
             window.URL.createObjectURL(blob);
              
         let alink = document.createElement("a");
         alink.href = fileURL;
         if(data.connected === "Role_User") {
         alink.download = `${data.user.nom}.${data.user.prenom}.${ext}`;
            } else {
                alink.download = `${data.entreprise.name}.${ext}`;
            }
         alink.click();
     });
 });
 };


    return (
        <div className="flex flex-col mx-5 md:mx-20 max-h-[50rem] md:max-h-[40rem] border-2 border-black rounded-2xl mb-10 bg-white">
            <ul id="messageList" className="flex flex-col  w-full gap-10 px-2 sm:pl-5 py-5 overflow-y-auto ">
                {chatmessage.message  && LocalMessage === "" ? (
                    <li className="flex justify-center items-center font-bold sm:text-xl md:text-2xl gap-4 py-10 ">démarrer la conversation</li>
            ) : (
                chatmessage.map((message, index) => 
                    message.sender === data.connected && data.connected === "Role_User" ? (
                    <li key={index} className="flex items-end gap-4 justify-end">
                    <div className="flex flex-col w-full items-end pb-2">
                    <div className="flex flex-col items-end gap-1 mb-2">
                    {message.file1 && VerifyFileExt(message.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file1}`} alt="" />) : message.file1 && VerifyFileExt(message.file1) === "document" ? (<div id={message.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                        <img id={message.file1} className="w-10 h-8" src="/dl.svg" alt="" />
                        <p id={message.file1} className="font-semibold text-white">{message.file1}</p>
                         </div>) : null}

                    {message.file2 && VerifyFileExt(message.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file2}`} alt="" />) : message.file2 && VerifyFileExt(message.file2) === "document" ? (  <div id={message.file2} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                        <img id={message.file2} className="w-10 h-8" src="/dl.svg" alt="" />
                        <p id={message.file2} className="font-semibold text-white">{message.file2}</p>
                         </div> ) : null}

                    {message.file3 && VerifyFileExt(message.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file3}`} alt="" />) : message.file3 && VerifyFileExt(message.file3) === "document" ? ( <div id={message.file3} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                        <img id={message.file3} className="w-10 h-8" src="/dl.svg" alt="" />
                        <p id={message.file3} className="font-semibold text-white">{message.file3}</p>
                         </div>) : null}
                    </div>
                        <p className="bg-rouge max-w-52 sm:max-w-96 md:max-w-[35rem] rounded-lg p-4 font-medium text-white text-wrap text-end break-words">{message.message}</p>
                        <div className="flex w-full flex-wrap h-full px-2">
                        <p className="font-medium w-full text-end">{data.user.nom} {data.user.prenom}</p>
                        <p className=" font-light w-full text-end ">{TransformDate(message.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                    <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.user.photoprofile}`}alt="" />
                    </div>
                </li>
                    ) : message.sender === data.connected && data.connected === "Role_Company" ? (    <li className="flex items-end gap-4 justify-end">
                    <div className="flex flex-col w-full items-end pb-2">
                        <div className="flex flex-col items-end gap-1 mb-2">
                    {message.file1 && VerifyFileExt(message.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file1}`} alt="" />) : message.file1 && VerifyFileExt(message.file1) === "document" ? (<div id={message.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                        <img id={message.file1} className="w-10 h-8" src="/dl.svg" alt="" />
                        <p id={message.file1} className="font-semibold text-white">{message.file1}</p>
                         </div>) : null}

                    {message.file2 && VerifyFileExt(message.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file2}`} alt="" />) : message.file2 && VerifyFileExt(message.file2) === "document" ? (  <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" /> ) : null}

                    {message.file3 && VerifyFileExt(message.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file3}`} alt="" />) : message.file3 && VerifyFileExt(message.file3) === "document" ? ( <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" />) : null}
                    </div>
                        <p className="bg-rouge max-w-52 sm:max-w-96 md:max-w-[35rem] rounded-lg p-4 font-medium text-white text-wrap text-end break-words">{message.message}</p>
                        <div className="flex w-full flex-wrap h-full px-2">
                        <p className="font-medium w-full text-end">{data.entreprise.name}</p>
                        <p className=" font-light w-full text-end ">{TransformDate(message.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                    <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.entreprise.logo}`}alt="" />
                    </div>
                </li>
                    ) : message.sender != data.connected && data.connected === "Role_Company" ? ( 
                        <li className="flex items-end gap-4 justify-start">
                    <div className="flex gap-4 pb-3 sm:pb-0 items-center">
                        <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.user.photoprofile}`} alt="icone utilisateur" />
                    </div>
                    <div className="flex flex-col w-full items-start pb-2">
                    <div className="flex flex-col items-end gap-1 mb-2">
                    {message.file1 && VerifyFileExt(message.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file1}`} alt="" />) : message.file1 && VerifyFileExt(message.file1) === "document" ? (<div id={message.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file1} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file1} className="font-semibold text-white">{message.file1}</p>
                         </div>) : null}

                    {message.file2 && VerifyFileExt(message.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file2}`} alt="" />) : message.file2 && VerifyFileExt(message.file2) === "document" ? ( <div id={message.file2} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file2} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file2} className="font-semibold text-white">{message.file2}</p>
                         </div> ) : null}

                    {message.file3 && VerifyFileExt(message.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file3}`} alt="" />) : message.file3 && VerifyFileExt(message.file3) === "document" ? ( <div id={message.file3} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file3} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file3} className="font-semibold text-white">{message.file3}</p>
                         </div>) : null}
                    </div>
                        <p className="bg-button rounded-lg p-4 font-medium text-sm md:text-base text-white text-wrap max-w-52 sm:max-w-96 break-words md:max-w-[25rem] w-fit lg:max-w-[35rem]">{message.message}</p>
                        <div className="flex flex-col w-full flex-wrap h-full px-2">
                        <p className="font-medium w-full text-start">{data.user.prenom} {data.user.nom}</p>
                        <p className=" font-light w-full text-start">{TransformDate(message.createdAt)}</p>
                        </div>
                    </div>
                </li> 

                    ) :  ( 
                    <li className="flex items-end gap-4 justify-start">
                    <div className="flex gap-4 pb-3 sm:pb-0 items-center">
                        <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.entreprise.logo}`} alt="icone utilisateur" />
                    </div>
                    <div className="sm:pb-2">
                    <div className="flex flex-col items-start gap-1 mb-2">
                    {message.file1 && VerifyFileExt(message.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file1}`} alt="" />) : message.file1 && VerifyFileExt(message.file1) === "document" ? (<div id={message.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file1} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file1} className="font-semibold text-white">{message.file1}</p>
                         </div>) : null}

                    {message.file2 && VerifyFileExt(message.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file2}`} alt="" />) : message.file2 && VerifyFileExt(message.file2) === "document" ? ( <div id={message.file2} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file2} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file2} className="font-semibold text-white">{message.file2}</p>
                         </div> ) : null}

                    {message.file3 && VerifyFileExt(message.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`/chats/${message.file3}`} alt="" />) : message.file3 && VerifyFileExt(message.file3) === "document" ? ( <div id={message.file3} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-button hover:brightness-90">
                        <img id={message.file3} className="w-10 h-8" src="/dlrouge.svg" alt="" />
                        <p id={message.file3} className="font-semibold text-white">{message.file3}</p>
                         </div>) : null}
                    </div>
                        <p className="bg-button rounded-lg p-4 font-medium text-sm md:text-base text-white text-wrap max-w-52 sm:max-w-96 break-words md:max-w-[25rem] w-fit lg:max-w-[35rem]">{message.message}</p>
                        <div className="flex flex-col  w-full justify-between px-2">
                        <p className="font-medium">{data.entreprise.name}</p>
                        <p className=" font-light">{TransformDate(message.createdAt)}</p>
                        </div>
                    </div>
                </li>
                    ) 
                 ))}
                 {LocalMessage.length > 0 && data.connected == "Role_Company" ? ( LocalMessage.map((localmessage, index) => 
                 <li className="flex items-end gap-4 justify-end">
                 <div className="flex flex-col w-full items-end pb-2">
                     <div className="flex flex-col items-end gap-1 mb-2">
                 {localmessage.file1 && VerifyFileExt(localmessage.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file1url}`} alt="" />) : localmessage.file1 && VerifyFileExt(localmessage.file1) === "document" ? (<div id={localmessage.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                     <img id={localmessage.file1} className="w-10 h-8" src="/dl.svg" alt="" />
                     <p id={localmessage.file1} className="font-semibold text-white">{localmessage.file1}</p>
                      </div>) : null}

                 {localmessage.file2 && VerifyFileExt(localmessage.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file2url}`} alt="" />) : localmessage.file2 && VerifyFileExt(localmessage.file2) === "document" ? (  <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" /> ) : null}

                 {localmessage.file3 && VerifyFileExt(localmessage.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file3url}`} alt="" />) : localmessage.file3 && VerifyFileExt(localmessage.file3) === "document" ? ( <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" />) : null}
                 </div>
                     <p className="bg-rouge max-w-52 sm:max-w-96 md:max-w-[35rem] rounded-lg p-4 font-medium text-white text-wrap text-end break-words">{localmessage.message}</p>
                     <div className="flex w-full flex-wrap h-full px-2">
                     <p className="font-medium w-full text-end">{data.entreprise.name}</p>
                     <p className=" font-light w-full text-end ">{TransformDate(localmessage.createdAt)}</p>
                     </div>
                 </div>
                 <div className="flex gap-4 items-center">
                 <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.entreprise.logo}`}alt="" />
                 </div>
             </li>
                
                )) : LocalMessage.length > 0 && data.connected == "Role_User" ? ( LocalMessage.map((localmessage, index) =>  <li className="flex items-end gap-4 justify-end">
                <div className="flex flex-col w-full items-end pb-2">
                    <div className="flex flex-col items-end gap-1 mb-2">
                {localmessage.file1 && VerifyFileExt(localmessage.file1) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file1url}`} alt="" />) : localmessage.file1 && VerifyFileExt(localmessage.file1) === "document" ? (<div id={localmessage.file1} onClick={handleDownload} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                    <img id={localmessage.file1} className="w-10 h-8" src="/dl.svg" alt="" />
                    <p id={localmessage.file1} className="font-semibold text-white">{localmessage.file1}</p>
                     </div>) : null}

                {localmessage.file2 && VerifyFileExt(localmessage.file2) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file2url}`} alt="" />) : localmessage.file2 && VerifyFileExt(localmessage.file2) === "document" ? (  <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" /> ) : null}

                {localmessage.file3 && VerifyFileExt(localmessage.file3) === "image"  ? ( <img className="aspect-auto max-w-40 max-h-40 rounded-md" src={`${localmessage.file3url}`} alt="" />) : localmessage.file3 && VerifyFileExt(localmessage.file3) === "document" ? ( <a onClick={handleDownload} className="aspect-auto max-w-40 max-h-40 rounded-md" src="/document.svg" alt="" />) : null}
                </div>
                    <p className="bg-rouge max-w-52 sm:max-w-96 md:max-w-[35rem] rounded-lg p-4 font-medium text-white text-wrap text-end break-words">{localmessage.message}</p>
                    <div className="flex w-full flex-wrap h-full px-2">
                    <p className="font-medium w-full text-end">{data.user.prenom} {data.user.nom}</p>
                    <p className=" font-light w-full text-end ">{TransformDate(localmessage.createdAt)}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                <img className="max-w-10 md:max-w-14 border-2 rounded-full border-black p-1" src={`/uploads/${data.user.photoprofile}`}alt="" />
                </div>
            </li>)) : null}
            <li className="flex" ref={messagesEndRef} ></li>
            </ul>
            {data.connected === "Role_User" && userTyping ? (
                        <p className="mx-5 pb-2">{data.entreprise.name} est en train d'écrire ...</p>
                    ) : data.connected === "Role_Company" && userTyping ? (<p className="mx-5 pb-2">{data.user.prenom} {data.user.nom} est en train d'écrire ...</p>) : null}
                    <ul className="flex gap-5 pb-2 flex-wrap">
                    {filepreview.length > 0  ? (
                        filepreview.map((file, index) => (
                            VerifyFileExt(file.name) === "image" ? (
                        <li>
                            <img id={file.url} data-filename={file.name}  className="bg-white p-1 rounded-md w-9 cursor-pointer absolute" onClick={DelImage} src="/burgerclose.svg" alt="" />
                        <img  key={index} className=" aspect-auto max-w-40 max-h-40 rounded-md" src={file.url} alt="" />
                        </li>
                            ) : VerifyFileExt(file.name) === "document" ? (
                                <li className="">
                                    <img id={file.url} data-filename={file.name}  className="bg-white p-1 bg-opacity-10 rounded-md w-10 cursor-pointer absolute" onClick={DelImage} src="/burgerclose.svg" alt="" />
                                <div key={index} className="flex cursor-pointer p-4 rounded-lg gap-2 items-center justify-center bg-rouge hover:brightness-90">
                        <p className="font-semibold text-white">{file.name}</p>
                         </div>
                                </li>
                            ) : null
                        ))) : null}
                        </ul>
                        {ErrorMaxFile ? ( <p className="flex font-semibold w-full justify-center py-1 items-center text-red-500">Vous avez atteint la limite de fichier par message</p>) : null}
                        {ErrorFile ? ( <p className="flex font-semibold w-full justify-center py-1 items-center text-red-500">Le fichier est trop lourd</p>) : null}
            <div  className="flex justify-end border-black mb-2 mx-2 border-2 p-1 rounded-full ">
            <div className=" flex  w-10 items-center justify-center">
                <img className="relative w-10 pointer-events-none" src="/attach.svg" alt="" />
                <input
                  className="absolute cursor-pointer appearance-none opacity-0 w-10 h-fit"
                  type="file"
                    accept="image/*, .pdf , .doc , .docx"
                  onChange={AddImage}
                />
            </div>
                <input id="inputmessage" className="w-full pl-5 text-sm sm:text-base rounded-full p-1 focus:outline-none" type="text" placeholder="tapez votre message" onKeyDown={handleKeyDown} onChange={handleActive}/>
                <div className="flex p-3 sm:pr-6 border-2 border-black gap-2 w-fit rounded-full active:scale-90 duration-300 cursor-pointer" onClick={Addmessage} >
                    <p className="hidden sm:block font-semibold w-fit">Envoyer</p>
                    <img className="border-black" src="/paperplane.svg" alt="" />
                </div>
            </div>
        </div>
    );
    }