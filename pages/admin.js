import React from 'react'
import style from "../styles/next/Admin.module.css"
import dbConnect from '../lib/dbConnect'
import ProjectModel from "../models/project"
import NewsModel from "../models/news"

import AdminLoginModal from "../component/modals/AdminLoginModal"

import ProjectTable from "../component/ProjectTable"
import NewsTable from "../component/NewsTable"
import EmailCampain from "../component/EmailCampain"
import {useState} from "react"
import { useEffect } from 'react'
import {useRouter} from 'next/router'
import axios from "axios"
import Link from "next/link" 
const admin = ({dark,isMobileOpen,_allProjects,_allNews}) => {
    
    const [twitter, setTwitter] = useState(0);
    const [discord, setDiscord] = useState(0);

    const handleTwitterFollower = async() => {
        const res = await axios.get('/api/getTwitterFollower')
        setTwitter(parseInt(res.data));
      }
    
      const handleDiscordFollower = async() => {
        const res = await axios.get('/api/getDiscordFollower')
        setDiscord(parseInt(res.data));
      }
    
      useEffect(() => {
        handleTwitterFollower();
        handleDiscordFollower();
      }, [])

    const handleTwitter = async() => {
        await axios.post('/api/admin/setTwitterFollower', {count: parseInt(twitter)})
    }

    const handleDiscord = async() => {
        await axios.post('/api/admin/setDiscordFollower', {count: parseInt(discord)})
    }

    return (
        <div className={`body  ${isMobileOpen&&"show"}`} style={{backgroundColor: 'white'}}>
            <div className={style.adminContainer}>
                <div className={style.adminMain}>
                    <div className={style.header}>Admin Section</div>
                    <Link  href="/admin/submitproject" style={{textColor: "black"}}>
                      <a id="sidebarSubmit"  className="btn-action">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.16699 10.0003V7.70253C4.16699 6.26419 4.16699 5.54503 4.51972 5.03276C4.65802 4.8319 4.8319 4.65802 5.03276 4.51972C5.54503 4.16699 6.26419 4.16699 7.70253 4.16699V4.16699C8.32909 4.16699 8.64237 4.16699 8.93247 4.25721C9.04867 4.29334 9.16132 4.34 9.26903 4.39661C9.53796 4.53796 9.75948 4.75948 10.2025 5.20253L10.4954 5.49542C11.0735 6.07348 11.3625 6.36251 11.7301 6.51475C12.0976 6.66699 12.5063 6.66699 13.3238 6.66699H13.5003C15.3859 6.66699 16.3288 6.66699 16.9145 7.25278C17.5003 7.83857 17.5003 8.78137 17.5003 10.667V11.8337C17.5003 13.7193 17.5003 14.6621 16.9145 15.2479C16.3288 15.8337 15.3859 15.8337 13.5003 15.8337H13.3337"
                            stroke="#10BC9D"
                            strokeWidth="2"
                          />
                          <path
                            d="M3.33301 13.7497H10.833M10.833 13.7497L7.91634 10.833M10.833 13.7497L7.91634 16.6663"
                            stroke="#10BC9D"
                            strokeWidth="2"
                          />
                        </svg>
                        Submit Project
                      </a>
                    </Link>
                    <ProjectTable _allProjects={_allProjects}/>
                    <NewsTable _allNews={_allNews}/>
                    <div className='row' style={{paddingLeft: "50px"}}>
                      <div class="col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Twitter: </span>
                          </div>
                          <input className="form-control" type="number" placeholder="twitter followers" value={twitter} onChange={(e) => { setTwitter(e.target.value) }} />
                          <button className="btn btn-success" onClick={ handleTwitter }>Change</button>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{paddingLeft: "50px"}}>
                      <div class="col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Discord: </span>
                          </div>
                          <input className="form-control" type="number" placeholder="discord followers" value={discord} onChange={(e) => { setDiscord(e.target.value) }} />
                          <button className="btn btn-success" onClick={ handleDiscord }>Change</button>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{paddingLeft: "50px"}}>
                      <div class="col-md-6">
                        <EmailCampain />
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default admin

export async function getServerSideProps(context) {
    await dbConnect()
    
    const filteredProjects = await ProjectModel.find({},{_id:1,name:1,"publicsale.date":1,imageId:1,approved:1,saleStatusType:1}).sort({name:1})
    const filteredNews = await NewsModel.find({},{_id:1,title:1,displayImageName:1}).sort({name:1})

    return {
      props: {
        _allProjects:JSON.parse(JSON.stringify(filteredProjects)),
        _allNews:JSON.parse(JSON.stringify(filteredNews)),

      }, // will be passed to the page component as props
    }
}