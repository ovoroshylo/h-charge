import React, { useEffect, useMemo } from 'react'
import axios from "axios"
import {useState} from "react"

const EmailCampain = () => {
    const [list, setList] = useState([])

    const handleList = async() => {
        const res = await axios.get('/api/email')

        setList(res.data)
    }

    useEffect(() => {
        handleList();
    }, []);

    const deleteApi = async(email) => {
        await axios.delete('/api/email/' + email)
    }

    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        }); 
    }

    const copyData = () => {
        let text = '';
        for(let i = 0 ; i < list.length ; i ++)
        {
            if(i == 0) text = list[i].email;
            else text += ',' + list[i].email
        }
        copyTextToClipboard(text)
    }

  return (
    <div>
        <span>Email Campain</span>
        <table class="table table-striped table-hover" style={{backgroundColor: "white"}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Created</th>
                <th scope="col"><div class="btn btn-success" onClick={copyData}>Copy All</div></th>
                </tr>
            </thead>
            <tbody>
                { list.map((item, index) => <tr><th scope="row">{index}</th><td>{ item.email}</td><td>{item.dateCreated}</td><td><a onClick={()=> { setList(list.filter((fitem) => fitem.email !== item.email)); deleteApi(item.email); } } ><span class="projectTableDelete">X</span></a></td></tr>) }
            </tbody>
        </table>
    </div>
  )
}

export default EmailCampain