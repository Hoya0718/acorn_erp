import axios from "../api/axios";
import {useEffect, useState} from 'react';



const Exam = () =>{
    const [exam, setExam] = useState([]);

    useEffect(()=>{
        fetchExam();
    },[]);

    const deleteExam= async (id) => {
        try{
            const url = `/${id}`;
            await axios.delete(url);
            fetchExam();
        }
        catch(err){
            console.log("delete err : " + err);
        }
    }
    const fetchExam = async() => {
        //async()이하 단 한번만 실행될 수 있도록 useEffect

    try{
        const response = await axios.get('/exam');
        setExam(response.data);
    }
    catch(err){
        console.log('fetch err')
    }

}

    return (
        <div>
            <h2>Employee List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>UserEmail</th>
                    <th>UserPassword</th>
                </tr>
                </thead>
                <tbody>
                    {
                    exam.map((exam)=>
                        <tr key={exam.id}> 
                            <td>{exam.id}</td>
                            <td>{exam.useremail}</td>
                            <td>{exam.userpassword}</td>
                            <button onClick={() => deleteExam(exam.id)}>삭제</button></tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default Exam;