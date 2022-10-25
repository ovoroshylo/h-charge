import React,{useState} from 'react'
import dynamic from "next/dynamic";
import style from "../../styles/next/createnews.module.css"
import Link from "next/link"
import axios from 'axios';
import { useEffect } from 'react'

export const Createnews = () => {
    const [title,setTitle] = useState("")
    const [discordLink,setDiscordLink] = useState("")
    const [twitterLink,setTwitterLink] = useState("")
    const [tags,setTags] = useState([])
    const [tagsInput,setTagsInput] = useState("")
    const [markDownText,setMarkDownText] = useState("")
    const [author,setAuthor] = useState("")

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [coverImage,setCoverImage] = useState(null)
    const [displayImage,setDisplayImage] = useState(null)
    const [success,setSuccess] = useState(false)
    const addTag = ()=>{
        if(tagsInput.length==0) return
        let temp = []
        temp=[...tags]
        temp.push(tagsInput)
        setTags([...temp])
        setTagsInput("")
    }
    const removeTag = (i)=>{
        let temp = []
        temp=[...tags]
        temp.splice(i,1)
        setTags([...temp])
    }

    const validateForm = ()=>{
        if(title.length<1) {
            setError("Invalid Title")
            return false
        }
        if(author.length<1) {
            setError("Invalid Author")
            return false
        }
        if(!coverImage) {
            setError("No Cover Image")
            return false
        }
        if(!displayImage) {
            setError("No display image")
            return false
        }
        if(markDownText == "") {
            setError("No Markdown text")
            return false
        }
        return true

    }
    const upload = async()=>{
        setError("")
        if(loading) return
        if(success) return
        let validate = validateForm()
        setLoading(true)
        if(validate){
            try{              
                let formData = new FormData()
                formData.append("title",title)
                formData.append("markdown",markDownText)
                formData.append("author",author)

                for(let i=0;i<tags.length;i++){
                    formData.append("tags[]",tags[i])
                }
                if(twitterLink && twitterLink!=""){
                    formData.append("twitterLink",twitterLink)
                }
                if(discordLink && discordLink!=""){
                    formData.append("discordLink",discordLink)
                }
                formData.append("displayImage",displayImage)
                formData.append("coverImage",coverImage)

                const res = await axios({
                    method: "post",
                    url: `/api/news/upload`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                if(res.data.success){   
                    setSuccess(true)
                }else{
                    setError(res.data.err)
                }
            }catch(e){
                console.log(e)
            }
        }
        
        setLoading(false)
    }

    useEffect(() => {
        var simplemde = new window.SimpleMDE({element: $("#smde")[0], toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "guide"]});
        simplemde.codemirror.on("change", function() {
            var renderedHTML = simplemde.options.previewRender(simplemde.value());
            $("#write_here").html(renderedHTML);
            $("#write_here").css("height", $("#markrow").height() +  "px" );
            setMarkDownText(simplemde.value())
        });

        $('.fa-bold').html('<svg width="13" height="13" viewBox="0 0 384 512"><path fill="currentColor" d="M304.793 243.891c33.639-18.537 53.657-54.16 53.657-95.693 0-48.236-26.25-87.626-68.626-104.179C265.138 34.01 240.849 32 209.661 32H24c-8.837 0-16 7.163-16 16v33.049c0 8.837 7.163 16 16 16h33.113v318.53H24c-8.837 0-16 7.163-16 16V464c0 8.837 7.163 16 16 16h195.69c24.203 0 44.834-1.289 66.866-7.584C337.52 457.193 376 410.647 376 350.014c0-52.168-26.573-91.684-71.207-106.123zM142.217 100.809h67.444c16.294 0 27.536 2.019 37.525 6.717 15.828 8.479 24.906 26.502 24.906 49.446 0 35.029-20.32 56.79-53.029 56.79h-76.846V100.809zm112.642 305.475c-10.14 4.056-22.677 4.907-31.409 4.907h-81.233V281.943h84.367c39.645 0 63.057 25.38 63.057 63.057.001 28.425-13.66 52.483-34.782 61.284z"></path></svg>');
        $('.fa-bold').removeClass('fa-bold');

        $('.fa-italic').html('<svg width="12" height="12" viewBox="0 0 320 512"><path fill="currentColor" d="M204.758 416h-33.849l62.092-320h40.725a16 16 0 0 0 15.704-12.937l6.242-32C297.599 41.184 290.034 32 279.968 32H120.235a16 16 0 0 0-15.704 12.937l-6.242 32C96.362 86.816 103.927 96 113.993 96h33.846l-62.09 320H46.278a16 16 0 0 0-15.704 12.935l-6.245 32C22.402 470.815 29.967 480 40.034 480h158.479a16 16 0 0 0 15.704-12.935l6.245-32c1.927-9.88-5.638-19.065-15.704-19.065z"></path></svg>');
        $('.fa-italic').removeClass('fa-italic');

        $('.fa-header').html('<svg width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"></path></svg>');
        $('.fa-header').removeClass('fa-header');

        $('.fa-quote-left').html('<svg width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M512 80v128c0 137.018-63.772 236.324-193.827 271.172-15.225 4.08-30.173-7.437-30.173-23.199v-33.895c0-10.057 6.228-19.133 15.687-22.55C369.684 375.688 408 330.054 408 256h-72c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h128c26.51 0 48 21.49 48 48zM176 32H48C21.49 32 0 53.49 0 80v128c0 26.51 21.49 48 48 48h72c0 74.054-38.316 119.688-104.313 143.528C6.228 402.945 0 412.021 0 422.078v33.895c0 15.762 14.948 27.279 30.173 23.199C160.228 444.324 224 345.018 224 208V80c0-26.51-21.49-48-48-48z"></path></svg>');
        $('.fa-quote-left').removeClass('fa-quote-left');

        $('.fa-list-ul').html('<svg width="12" height="12" viewBox="0 0 32 32"><path fill="currentColor" d="M12 2h20v4h-20v-4zM12 14h20v4h-20v-4zM12 26h20v4h-20v-4zM0 4c0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.209-1.791-4-4-4s-4 1.791-4 4zM0 16c0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.209-1.791-4-4-4s-4 1.791-4 4zM0 28c0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.209-1.791-4-4-4s-4 1.791-4 4z"></path></svg>');
        $('.fa-list-ul').removeClass('fa-list-ul');

        $('.fa-list-ol').html('<svg width="14" height="14" viewBox="0 0 512 512"><path fill="currentColor" d="M3.263 139.527c0-7.477 3.917-11.572 11.573-11.572h15.131V88.078c0-5.163.534-10.503.534-10.503h-.356s-1.779 2.67-2.848 3.738c-4.451 4.273-10.504 4.451-15.666-1.068l-5.518-6.231c-5.342-5.341-4.984-11.216.534-16.379l21.72-19.938C32.815 33.602 36.732 32 42.785 32H54.89c7.656 0 11.749 3.916 11.749 11.572v84.384h15.488c7.655 0 11.572 4.094 11.572 11.572v8.901c0 7.477-3.917 11.572-11.572 11.572H14.836c-7.656 0-11.573-4.095-11.573-11.572v-8.902zM2.211 304.591c0-47.278 50.955-56.383 50.955-69.165 0-7.18-5.954-8.755-9.28-8.755-3.153 0-6.479 1.051-9.455 3.852-5.079 4.903-10.507 7.004-16.111 2.451l-8.579-6.829c-5.779-4.553-7.18-9.805-2.803-15.409C13.592 201.981 26.025 192 47.387 192c19.437 0 44.476 10.506 44.476 39.573 0 38.347-46.753 46.402-48.679 56.909h39.049c7.529 0 11.557 4.027 11.557 11.382v8.755c0 7.354-4.028 11.382-11.557 11.382h-67.94c-7.005 0-12.083-4.028-12.083-11.382v-4.028zM5.654 454.61l5.603-9.28c3.853-6.654 9.105-7.004 15.584-3.152 4.903 2.101 9.63 3.152 14.359 3.152 10.155 0 14.358-3.502 14.358-8.23 0-6.654-5.604-9.106-15.934-9.106h-4.728c-5.954 0-9.28-2.101-12.258-7.88l-1.05-1.926c-2.451-4.728-1.226-9.806 2.801-14.884l5.604-7.004c6.829-8.405 12.257-13.483 12.257-13.483v-.35s-4.203 1.051-12.608 1.051H16.685c-7.53 0-11.383-4.028-11.383-11.382v-8.755c0-7.53 3.853-11.382 11.383-11.382h58.484c7.529 0 11.382 4.027 11.382 11.382v3.327c0 5.778-1.401 9.806-5.079 14.183l-17.509 20.137c19.611 5.078 28.716 20.487 28.716 34.845 0 21.363-14.358 44.126-48.503 44.126-16.636 0-28.192-4.728-35.896-9.455-5.779-4.202-6.304-9.805-2.626-15.934zM144 132h352c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>');
        $('.fa-list-ol').removeClass('fa-list-ol');

        $('.fa-link').html('<svg width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>');
        $('.fa-link').removeClass('fa-link');

        $('.fa-picture-o').html('<svg width="14" height="14" viewBox="0 0 20 20"><path fill="currentColor" d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"></path></svg>');
        $('.fa-picture-o').removeClass('fa-picture-o');
        
        $('.fa-question-circle').html('<svg width="18" height="18" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 800.256L223.712 224H320v31.68c0 35.456 28.64 64.32 63.872 64.32h256.256A64.16 64.16 0 0 0 704 255.68V224l96-0.256L800.256 800 224 800.256zM640 192.32L640.128 256 384 255.68V192.32L383.872 192 640 192.32zM799.84 160H695.04c-11.072-19.04-31.424-32-54.912-32h-256.256c-23.488 0-43.808 12.928-54.912 32H223.712A63.776 63.776 0 0 0 160 223.744v576.512C160 835.392 188.608 864 223.744 864h576.512A63.84 63.84 0 0 0 864 800.256V223.744A64 64 0 0 0 799.84 160zM619.072 429.088l-151.744 165.888-62.112-69.6a32 32 0 1 0-47.744 42.624l85.696 96a32 32 0 0 0 23.68 10.688h0.192c8.96 0 17.536-3.776 23.616-10.4l175.648-192a32 32 0 0 0-47.232-43.2"></path></svg>');
        $('.fa-question-circle').removeClass('fa-question-circle');
    }, [])
    
  return (
    <div className={`body ${style.container}`}>

        <div className={style.main}>
            <div className="row" style={{margin: "20px"}}>
            <div className={style.headerContainer}>
                <Link href="/admin">
                    <div className='btn btn-success'>Back to Admin</div>
                </Link>
            </div>

            <div className={style.header}>News Mark Down</div>
        
            <div class="col-md-12" style={{margin: "auto"}}>
                <div class="row" id="markrow">
                    <div class="six columns col-md-4">
                        <textarea id="smde" class="CodeMirror"></textarea>
                    </div>
                    <div class="six columns reader col-md-8" id="write_here" style={{border: "1px solid rgb(187, 187, 187);", wordBreak: "break-all", overflow: "scroll"}}>
                    </div>
                </div> 
            </div>
                <div className={style.header}>Meta Data</div>
                <div class="col-md-6" style={{margin: "auto"}}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Title : </span>
                        </div>
                        <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Author : </span>
                        </div>
                        <input className="form-control" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Add Tags </span>
                        </div>
                        <input className="form-control" value={tagsInput} onChange={(e)=>setTagsInput(e.target.value)} />
                        <button className="btn btn-success" onClick={()=>addTag()}>Add</button> 
                    </div>
                    <div className="input-group mb-3">
                        {tags.map((tag,i)=>{
                            return(<div key={i} className={style.tag}>{tag} <span onClick={()=>removeTag(i)} style={{color:"red",cursor:"pointer"}}>x</span></div>)
                        })}
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Twitter Link (optional) : </span>
                        </div>
                        <input className="form-control" value={twitterLink} onChange={(e)=>setTwitterLink(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Discord Link (optional) : </span>
                        </div>
                        <input className="form-control" value={discordLink} onChange={(e)=>setDiscordLink(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Cover Image (required) : </span>
                        </div>
                        <input className="form-control" type="file"  onChange={(event) => {setCoverImage(event.target.files[0])}}/>
                        {coverImage && <div>
                        <img alt="coverImg" src={URL.createObjectURL(coverImage)}  />
                        <div onClick={()=>setCoverImage(null)} className={style.removeImg} >Remove</div>
                        </div>
                        }
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Display Image (required) : </span>
                        </div>
                        <input className="form-control" type="file"  onChange={(event) => {setDisplayImage(event.target.files[0])}}/>
                        {displayImage && <div>
                        <img alt="displayImg" src={URL.createObjectURL(displayImage)}  />
                        <div onClick={()=>setCoverImage(null)} className={style.removeImg} >Remove</div>
                        </div>
                        }
                    </div>
                    <div className="input-group mb-3">
                        {!success && <div onClick={()=>upload()} className='btn btn-success'>{loading? "Loading":"Upload"}</div>}
                        {success && <div  className='btn btn-success'>Uploaded Successfully</div>}
                        <div className={style.error}>{error}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Createnews