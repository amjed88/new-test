import React, { useState, component, useEffect, useCallback } from 'react';
import "./comp.css"
import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import dayjs from 'dayjs';
import { MdClose } from "react-icons/md";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

function Categ() {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [time, settime] = useState(new Date());
    const [deta, setdata] = useState({
        id: null,
        categuray: null,
        date: null
    });
    const endPoints =
        process.env.NODE_ENV !== 'production' ?
            {
                AUTH: process.env.REACT_APP_api_cat

            }
            :
            {
                AUTH: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_api_cat}`

            }
    const [buttomtext, setbuttomtext] = useState("اضافة");
    const [check, setcheck] = useState(true);

    const [display, setdisplay] = useState([]);
    const displays = useCallback(async () => {
        const res = await fetch(`${endPoints.AUTH}/Categ/all`, {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            }
        })
        const respose = await res.json()
        setdisplay(respose)

    });
    useEffect(() => {
        displays();

    });
    const onaction = (e) => {
        fetch(`${endPoints.AUTH}/categ`, {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                categuray: deta.categuray,
                date: time
            })
        })
            .then(res => res.json())
            .then(data => {
                displays()
            });

    }
    const ondel = (availability) => {
        fetch(`${endPoints.AUTH}/categ/del`, {
            method: "delete",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            },
            body: JSON.stringify({

                id: availability.id
            })
        })
            .then(res => res.json())
            .then(data => {
                displays()
            });

    }
    const onedit = () => {
        fetch(`${endPoints.AUTH}/categ/update`, {
            method: "put",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                categuray: deta.categuray,
                date: time,
                id: deta.id
            })
        })
            .then(res => res.json())
            .then(data => {
                displays()
            });

    }

    return (
        <div className="cat-main">
            <div>
                <header>
                    <h2>
                        التصنيف
                    </h2>
                </header>

            </div>

            <div className="add-buttom">
                <ModalProvider>

                    <>
                        <button className="add-1" onClick={function (e) { openModal(); setdata({}); setbuttomtext("اضافة"); setcheck(true) }}>اضافة تصنيف</button>
                        <Modal
                            id="any-unique-identifier"
                            isOpen={isModalOpen}
                            transition={ModalTransition.BOTTOM_UP}
                        >
                            <div className="model-con">
                                <div className="pos-model2">
                                    <div className="close">
                                        <MdClose className="clos-model"
                                            onClick={() => closeModal()}
                                        />
                                    </div>
                                    <label className="cat-lbl" >:التصنيف</label>
                                    <input className="cat-add3" type="text" value={(deta && deta.categuray)} onChange={(e) => setdata({ ...deta, categuray: e.target.value })} />
                                    <label className="cat-lbl2">:التاريخ</label>
                                    <DatePicker className="cat-add2"
                                        onChange={settime}
                                        value={time} />
                                </div>
                            </div>
                            <button className="cat-but" onClick={() => { check ? onaction() : onedit(); closeModal() }} >{buttomtext}</button>
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
                            <th scope="col" >التاريخ</th>
                            <th scope="col">التصنيف</th>
                            <th scope="col">ت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display.map(availability => {
                            return (
                                <tr>
                                    <td>{dayjs(availability.date).format('DD/MM/YYYY')} <button {...buttonProps}>الاجراء</button>
                                    <div className={isOpen ? 'visible' : ''} role='menu'>
                                        <a {...itemProps[0]} onClick={function (e) { openModal(); setdata(availability); settime(availability.date); setbuttomtext("تعديل"); setcheck(false) }}>تعديل</a>
                                        <a {...itemProps[1]} onClick={() => window.confirm("Are you sure you wish to delete this item?") && ondel(availability)}>مسح</a>
                                    </div>
                                        {/* <div className="drops-down"><h3> اجراء<div className="drop"><ul><li onClick={function (e) { openModal(); setdata(availability); settime(availability.date); setbuttomtext("تعديل"); setcheck(false) }}>تعديل</li><li onClick={() => window.confirm("Are you sure you wish to delete this item?") && ondel(availability)}>مسح</li></ul> </div></h3></div> */}
                                    </td>
                                    <td>{availability.categuray}</td>
                                    <td >{availability.id} </td>


                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>






        </div>
    );
}
export default Categ