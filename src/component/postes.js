import React, { useState, component, useEffect,useCallback } from 'react';
import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css';
import "./comp.css"
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import dayjs from 'dayjs';
import { MdClose } from "react-icons/md";

function Post() {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [time, settime] = useState(new Date());
    const [selects, setselects] = useState([{
        id: null,
        categuray: null,
        date: null
    }]);
    const [data, setdata] = useState({
        id:null,
        depar: null,
        postitl: null,
        date: null,
        categuray:null

    });
     const endPoints =
    process.env.NODE_ENV !== 'production' ?
        {
            TASK: process.env.REACT_APP_api_pst,
            AUTH: process.env.REACT_APP_api_cat

        }
        :
        {
            TASK: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_api_pst}`,
            AUTH: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_api_cat}`

        }
    const [desplay, setdesplay] = useState([]);
    const [id,setid]=useState({
        catid:null,
    });
    const [buttomtext,setbuttomtext]=useState("اضافة");
    const [check,setcheck]=useState(true);
    const cat =()=>{
                fetch(`${endPoints.AUTH}/Categ/all`, {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(dataa => {
                setselects(dataa)
            });
    }
    const display = useCallback(async()=>{
        const res=await fetch(`${endPoints.TASK}/post/all`, {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            }
        })
            const respose=await res.json()
            setdesplay(respose)

    },[]);
    useEffect(() => {
        display();

    },[display]);
    const onchange = (e) => {
        setid({ ...id, catid: e.value });
    }
    const onaction = () => {
        fetch(`${endPoints.TASK}/post/insert`, {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                depar: data.depar,
                postitl: data.postitl,
                date: time,
                catid: id.catid
            })
        })
            .then(res => res.json())
            .then(data => {display()
            });
            


    }
    const onedit=()=>{
            fetch(`${endPoints.TASK}/post/updat`, {
                method: "put",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    depar: data.depar,
                    postitl: data.postitl,
                    date: time,
                    catid: id.catid,
                    id:data.id
                })
            })
                .then(res => res.json())
                .then(data => {display()
                });
    }
    const ondel=(availability)=>{
        fetch(`${endPoints.TASK}/post/del`, {
            method: "delete",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            },
            body: JSON.stringify({

                id:availability.id
            })
        })
            .then(res => res.json())
            .then(data => {display()
            });
            
}

return (
        <div className="cat-main">
            <div>
                <header>
                    <h2>
                        المنشورات
                    </h2>
                </header>

            </div>
            <div className="add-buttom">
                <ModalProvider>

                    <>
                        <button class="add-1" onClick={function(e) {openModal();setdata({});setbuttomtext("اضافة");setcheck(true)}} >اضافة منشور</button>
                        <Modal
                            id="any-unique-identifier"
                            isOpen={isModalOpen}
                            transition={ModalTransition.BOTTOM_UP}
                        >
                            <div className="model-con">
                            <div className="pos-model">
                            <div className="close">
                                        <MdClose className="clos-model"
                                            onClick={() => closeModal()}
                                        />
                                    </div>
                                <label className="cat-lbl" >:التصنيف</label>
                                <Select className="cat-select" defaultValue={{label:data.categuray}} options={selects.map(res => ({ value: res.id, label: res.categuray }))} onChange={(e) => onchange(e)} openMenuOnClick={cat()} />
                                <label className="cat-lbl2">:التاريخ</label>
                            <DatePicker className="cat-add2"
                                onChange={settime}
                                value={time} />
                                <label className="cal-labl3">:القسم</label>
                                <input className="cat-add3" type="text" value={data.depar} onChange={(e) => setdata({...data,depar: e.target.value })} />
                                <label className="cal-labl4">:عنوان المنشور</label>
                                <input className="cat-add4" type="text" value={data.postitl} onChange={(e) => setdata({...data, postitl: e.target.value })} />
                            </div>
                            </div>
                            <button className="cat-but" onClick={()=> {check? onaction():onedit();closeModal()}} > {buttomtext}</button>
                            <button className="cat-but2" onClick={closeModal}>الغاء</button>
                        </Modal>
                    </>
                </ModalProvider>
                {/* <button > اضافة تصنيف</button> */}

            </div>
            <div className="cat-table">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">التاريخ</th>
                            <th scope="col">عنوان المنشور</th>
                            <th scope="col" >القسم</th>
                            <th scope="col">التصنيف</th>
                            <th scope="col">ت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {desplay.map(availability => {
                            return (
                                <tr>
                                    <td>{dayjs(availability.date).format('DD/MM/YYYY') } <div className="drops-down"><h3> اجراء<div className="drop"><ul><li onClick={function(e){openModal();setdata(availability); settime(availability.date) ;setbuttomtext("تعديل");setcheck(false)}}>تعديل</li><li onClick={()=>window.confirm("Are you sure you wish to delete this item?")&& ondel(availability)}>مسح</li></ul> </div></h3></div>
                                    {/* <Select className="cat-sele" defaultValue={{label:"اجراء"}} options={[
                                        {value:"اجراء" ,label:"اجراء"},
                                        { value: 'edit', label: <button onClick={openModal}> تعديل</button> },
                                        { value: 'delete', label: <button onClick={()=>window.confirm("Are you sure you wish to delete this item?")&& ondel(availability)}> مسح</button> }]} onChange={(e)=>{if (e.value==="edit"){setdata(availability); settime(availability.date)} ;setbuttomtext("تعديل");setcheck(false)} } /> */}
                                         </td>
                                    <td>{availability.postitl}</td>
                                    <td >{availability.depar} </td>
                                    <td >{availability.categuray} </td>
                                    <td >{availability.id} </td>



                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>




    )
}
export default Post;