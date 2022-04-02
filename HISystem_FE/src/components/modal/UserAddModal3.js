/*eslint-disable*/

import React, { useState } from "react";
// import { useEffect } from "react/cjs/react.development";
import DaumPostcode from "react-daum-postcode";
// import addrApiImg from "assets/img/addrApi/close.png";
import addrApiModal from "assets/css/addrApiModal.css";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";
import { useEffect } from "react/cjs/react.development";

// var userDoctorList = [];

// (() => {
//     fetch(`http://localhost:8081/user/1/notSearch`, {
//       method: "get",
//     }).then((res) => res.json())
//       .then((res) => {
//         patientList = res;
//       });
//   })();

const UserAddModal3 = ({ setRenewalUser,renewalUser,reload, setReload }) => {
    /**
     * 주소 api
     */
    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();
    const [isDetailAddress, setIsDetailAddress] = useState("");
    const [isPostOpen, setIsPostOpen] = useState();

    const handleComplete = (data) => {
        setPostModal({isOpen: false});

        console.log(data)
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setIsZoneCode(data.zonecode);
        setIsAddress(fullAddress);
        setIsPostOpen(false);
        
        if(data !== "") {
            setValidAddr("true")

        }else{
            setValidAddr("null")
        }
         
        
    };

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        // top: "",
        width: "400px",
        height: "500px",
        padding: "7px",
    };

    const addrApiStyle = {
        cursor: "pointer",
        position: "absolute",
        right: "-3px",
        top: "-3px"
        // z-index:1"
    }
   
    /**
     * 상태값 선언
     */
    const [modalState, setModalState] = useState({ isOpen: false });
    const [postModal, setPostModal] = useState({ isOpen: false });

    const [user, setUser] = useState({
        name: "",
        id: "",
        pwd: "",
        ssn: "",
        addr: "",
        phone: "",
        gender: "",
        role: "1",
    });

    const [checkId, setCheckId] = useState(false);


    const [validName, setValidName] = useState("true");
    const [validId, setValidId] = useState("true");
    const [validPwd, setValidPwd] = useState("true");
    const [validPwd2, setValidPwd2] = useState("true");
    const [validSsn, setValidSsn] = useState("true");
    const [validPhone, setValidPhone] = useState("true");
    const [validRegister, setValidRegister] = useState("true");
    const [validAddr, setValidAddr] = useState("true");
    const [validGender, setValidGender] = useState("true");
    const [validDetailAddress, setValidDetailAddress] = useState("true");

    const [validCheck, setValidCheck] = useState({
        name: "true",
        id: "true",
        pwd: "true",
        pwd2: "true",
        ssn: "true",
        phone: "true",
        register: "true",
        address: "true",
        gender: "true",
    });

    const [nullCheckName, setNullCheckName] = useState(false);
    const [nullCheckId, setNullCheckId] = useState(false);
    const [nullCheckPwd, setNullCheckPwd] = useState(false);
    const [nullCheckPwd2, setNullCheckPwd2] = useState(false);
    const [nullCheckGender, setNullCheckGender] = useState(false);
    const [nullCheckSsn, setNullCheckSsn] = useState(false);
    const [nullCheckPhone, setNullCheckPhone] = useState(false);
    const [nullCheckAddress, setNullCheckAddress] = useState(false);

    const [ssn1, setSsn1] = useState("")
    const [ssn2, setSsn2] = useState("")
    const [pwd2, setPwd2] = useState("")
    const [phone1, setPhone1] = useState("")
    const [phone2, setPhone2] = useState("")
    const [phone3, setPhone3] = useState("")
    const [addr1, setAddr1] = useState("")




/**
 * 등록 유효성 검사
 */
    //이름 입력 및 체크
    const onChangeInputName = (e) => {
        // setUser({ name: e.target.value })
        setUser( Object.assign({}, user, { name: e.target.value }))
        if(0 < e.target.value?.length){
            setValidName("true");
        }else{
            setValidName("false");
        }
        


    };
    //아이디 입력 및 체크
    const onChangeInputId = (e) => {
        // setUser({ id: e.target.value })
        setUser( Object.assign({}, user, { id: e.target.value }))
        // debugger;
        if(0<e.target.value){
            setValidId("true")  
        }else{
            setValidId("null")   
        }
        // debugger;
        console.log(validId)
        // (0 < e.target.value) 
        // ? setValidId("true")
        // :setValidId("false")
       

    };


    
    // 비밀번호 입력 및 체크
    const onChangeInputPwd = (e) => {
        setUser( Object.assign({}, user, { pwd: e.target.value }))
        if(1 < e.target.value?.length && e.target.value?.length < 11)
        {
            setValidPwd("true")
        }else{
            setValidPwd("false")
        }
        
        


    };
    // 비밀번호 재확인 입력 및 체크
 
    const onChangeInputPwd2 = (e) => {

        setPwd2(e.target.value)
        if(user.pwd === e.target.value){
            setValidPwd2("true")
        }else{
            setValidPwd2("false")
        }
        
    };
    // 주소 입력 및 체크는 주소 합치는 곳에서 유효성검사용 상태 변경해줌
    // const onChangeInputAddr = (e) => {
    //     setValidAddress(addr === e.target.value)
    // };
/**
 * 주민번호 입력 및 체크
 */

    // 주민번호 다음칸 이동
    function jumpSsn(e) {
        if (e.target.value.length >= 6) {
            document.getElementById("ssn2").focus()
        }
    }
    // 주민번호 합치기
    const onChangeInputSsn = (e) => {
        // setUser( Object.assign({}, ssn2, {  e.target.value }))

        setSsn2(e.target.value)
        let resultSsn = ssn1 + e.target.value

        // debugger;
    // 10자 제한(validation)
    if((resultSsn)?.length === 13){
        setValidSsn("true");
    }else{
        setValidSsn("false");
    }
    
    setUser( Object.assign({}, user, { ssn: ssn1 + "-" +e.target.value }))

    // debugger;
    
    };

/**
 * 전화번호 입력 및 체크
 */

    // 전화번호 다음칸 이동
    function jumpPhone(e) {
        console.log(e.target.value)
        if (e.target.value.length >= 3) {
            document.getElementById("cellPhone2").focus()
        }
    }
    // 전화번호 다음칸 이동
    function jumpPhone2(e) {
        console.log(e.target.value)
        if (e.target.value.length >= 4) {
            document.getElementById("cellPhone3").focus()
        }
    }

    const onChangeInputPhone = (e) => {
        // debugger;
        e.preventDefault()
        // setPhone3(e.target.value.substr(0, 4))
        setPhone3(e.target.value)
        console.log(user.phone)
        console.log(user)
        console.log(user.id)
        console.log(user.pwd)
        console.log(user.gender)
        console.log(user.role);

        let resultPhone = phone1 + phone2 + e.target.value
        setUser( Object.assign({}, user, { phone: phone1 +"-"+ phone2 +"-"+ e.target.value }))

        // setUser({phone: resultPhone})
        // setUser(Object.assign( user, {phone: resultPhone}))

        var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (regPhone.test(resultPhone) === true) {
            setValidPhone("true");
            console.log(user.phone)

        } else {
            setValidPhone("false");
        }
    };

/**
 * 주소 입력 및 합치기
 */
const onChangeInputAddr = (e) =>{
    setIsDetailAddress(e.target.value)
    // setUser( { addr: isZoneCode + " " + isAddress + e.target.value})
    setUser( Object.assign({}, user, { addr: isZoneCode + " " + isAddress + e.target.value}))

    // if(isZoneCode !== "" && isAddress !== ""){
    //     setValidAddr("true")
    // }
    
}

const userAddr = () =>{
    return user.addr
}

/**
 * 라디오버튼 체인지이벤트
 */
 const onChangeInputGender = (e) =>{
    setUser( Object.assign({}, user, { gender: e.target.value }))

    // setUser({gender:e.target.value})
  

 }
/**
 * 등록 (통신)전 유효성검사
 */
    // const handlersubmit = (e) => {
        
    //     e.preventDefault();
    //     console.log(user.gender);
    //     console.log(user.addr);
    //     console.log(user.phone);
    //     if (validName && validId && validSsn && validPwd && validPwd2 && validPhone && validAddr) {
    //         registerUser(e)
    //     }
    //     else {
    //         setValidRegister(true);
    //     }

    // }

/**
 * 등록 (통신)
 */
    const registerUser = async () => {
        console.log(user)
        console.log(user.role);
        
        // e.preventDefault();
        // userAdd(user)
        const response = await fetch(`http://localhost:8081/admin/user/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            console.log(response)
            throw `${response.status} ${response.statusText}`;
        }
        console.log(response)
        closeModal();
        alert("등록되었습니다")
        // const jsonResult = response.json;
        setReload(!reload);
        setCheckRegisterState("")
        // setRenewalUser(user);
    };

/**
 * 모달창닫기
 */
    function closeModal() {
        setModalState({ isOpen: false })
        setValidName("true");
        setValidId("true");
        setValidPwd("true");
        setValidPwd2("true");
        setValidSsn("true");
        setValidPhone("true");
        setValidGender("true");
        setValidAddr("true")
        setIsAddress("");
        setIsZoneCode("");
        setIsDetailAddress("")
        setCheckId(false)
        setNullCheckAddress(false)
        setNullCheckId(false)
        setNullCheckName(false)
        setNullCheckGender(false)
        setNullCheckPhone(false)
        setNullCheckPwd(false)
        setNullCheckSsn(false)

        // setValidRegister(true);
        // setUser("");
        setUser( Object.assign({}, user, {name:"",id:"",pwd:"",ssn:"",phone:"",gender:"",addr:"", role: "1" }))
        setPwd2("");
        setSsn1("");
        setSsn2("");
        setPhone1("");
        setPhone2("");
        setPhone3("");

    }


/**
 * 아이디 중복확인
 */
    const onBlurId = async (e) => {

        const response = await fetch(`http://localhost:8081/admin/user/checkId/${user.id}`, {
            method: "get",
        }).then((res) => res.json()).then((res) => {
            console.log(res)
            if (res.data) {
                //중복되는 아이디일 때
                setCheckId(true);

            } else {
                setCheckId(false);
                setValidId("true");
            }
        })


    }
    const onClickRegister = (e) =>{
        e.preventDefault();
        // 아무것도 안적고 등록클릭시
        if(user.name === ""|| user.name ===  undefined){     setValidName("null")      } else {setValidName("true")}
        if(user.id === ""|| user.id ===  undefined){         setValidId("null"); setCheckId(false)      } else {setValidId("true")}
        if(user.ssn === ""|| user.ssn ===  undefined){       setValidSsn("null")      } else {setValidSsn("true")}
        if(user.pwd === ""|| user.pwd ===  undefined){       setValidPwd("null")      } else {setValidPwd("true")}
        if(pwd2 === ""|| pwd2 ===  undefined){               setValidPwd2("null")      } else {setValidPwd2("true")}
        if(user.phone === ""|| user.phone ===  undefined){   setValidPhone("null")      } else {setValidPhone("true")}
        if(user.gender === ""|| user.gender ===  undefined){ setValidGender("null")      } else {setValidGender("true")}
        if(user.addr === ""|| user.addr ===  undefined){     setValidAddr("null")      } else {setValidAddr("true")}
        
 
        console.log(user.gender);
        console.log(user.addr);
        console.log(user.phone);
        console.log(user.role);
        if (validName === "true" && validId === "true" &&validSsn === "true" && validPwd === "true" && validPwd2 === "true" && validPhone === "true" && validAddr === "true"                //다 유효해야하고
            //&& !(user.name === "" || user.id === "" || user.ssn ==="" || user.pwd === "" || user.phone === ""|| user.gender === ""|| user.role === "" ) &&        //공백이 하나라도 있으면 안됨
            // !(user.name === undefined || user.id === undefined || user.ssn ===undefined || user.pwd === undefined || user.phone === undefined|| user.gender === undefined|| user.role === undefined )
            )  {
            setCheckRegisterState("Y")
            
        }
        else {
            setValidRegister(true);
        }
   
    }
    const [checkRegisterState,setCheckRegisterState] = useState("");

    useEffect(() => {
        if(checkRegisterState=== "Y"){
            registerUser()
        }
      }, [checkRegisterState]);

    //신규등록 버튼
    const onClickRegisterForm = (e) => {

        setModalState({ isOpen: true })

    }

    return (
        <>
            <Row>
                <Col md="12">
                    <Button color="primary" type="button"
                        onClick={onClickRegisterForm}
                    >
                        신규등록
                    </Button>

                    <Modal
                        className="modal-dialog-centered"
                        size="m"
                        isOpen={modalState.isOpen}
                        toggle={closeModal}
                    >
                        {/* <div className="modal-header">
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={closeModal}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div> */}
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    {/* header 문구 */}
                                    <div className="text-center text-muted mb-4">
                                        <strong>직원 신규등록</strong>
                                    </div>

                                    <Form
                                        role="form"
                                        // onSubmit={handlersubmit}
                                    >
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 이름 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="이름"
                                                    type="name"
                                                    value={user.name}
                                                    id="name"
                                                    onChange={onChangeInputName}
                                                />

                                            </InputGroup>
                                            {validName === "true" 
                                                ? null
                                                : validName === "false"
                                                    ? null
                                                    :<span style={{ color: "red" }}>이름이 비어있습니다.</span>  

                                            }
                                           
                                            {/* {user.name === '' ?
                                                null :
                                                validName ?
                                                    null :
                                                    <span style={{ color: "red" }}>이름이 비어있습니다.</span>

                                            } */}
                                        </FormGroup>

                                        <FormGroup className="mb-3">

                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 아이디 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="아이디"
                                                    type="id"
                                                    value={user.id}
                                                    id="id"
                                                    onChange={onChangeInputId}
                                                    onBlur={onBlurId}

                                                />


                                            </InputGroup>
                                            {/* {user.id === '' ?
                                                null :
                                                validId ?
                                                    null :
                                                    <span style={{ color: "red" }}>아이디는 2~10자리 입니다.</span>

                                            } */}
                                            {checkId 
                                                ?  <span style={{ color: "red" }}>중복되는 아이디입니다.</span> 
                                                :  validId === "true"
                                                        ? null
                                                        : validId === "false"
                                                            ? <span style={{ color: "red" }}>유효하지 않은 아이디입니다.</span> 
                                                            : validId === "null"
                                                                ?<span style={{ color: "red" }}>아이디가 비어있습니다.</span> 
                                                                : null

                                            }


                                            {/* {validId == "true" 
                                                ? null
                                                : validName == "false"
                                                    ? null
                                                    :<span style={{ color: "red" }}>이름이 비어있습니다.</span>  

                                            } */}
                                           

                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 비밀번호 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="비밀번호"
                                                    type="password"
                                                    value={user.pwd}
                                                    id="pwd"
                                                    onChange={onChangeInputPwd}
                                                />
                                            </InputGroup>
                                            {/* {validPwd === ""
                                                ?  null
                                                : validPwd === "false"
                                                    ? <span style={{ color: "red" }}>비밀번호는 2~10자리 입니다.</span>
                                                    : null
                                            } */}
                                            {validPwd === "true" 
                                                ? null
                                                : validName === "false"
                                                    ? <span style={{ color: "red" }}>비밀번호 형식은 2~10자리입니다.</span>  
                                                    :<span style={{ color: "red" }}>비밀번호가 비어있습니다.</span>  

                                            }


{/* 
                                            {validPwd === "false"
                                                ? <span style={{ color: "red" }}>비밀번호는 2~10자리 입니다.</span>
                                                : nullCheckPwd 
                                                    ? <span style={{ color: "red" }}>비밀번호가 비어있습니다.</span>
                                                    : null

                                            } */}
                                         

                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 비밀번호 재확인 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="비밀번호 재확인"
                                                    type="password"
                                                    value={pwd2}
                                                    id="pwd"
                                                    onChange={onChangeInputPwd2}
                                                />
                                            </InputGroup>
                                            {validPwd2 === "true" 
                                                ? null
                                                : validPwd2 === "false"
                                                    ? <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>  
                                                    :<span style={{ color: "red" }}> 필수 사항입니다.</span>  

                                            }
                                            {/* {validPwd2 === "false"
                                                ? <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>
                                                : nullCheckPwd2
                                                    ? <span style={{ color: "red" }}>필수 사항입니다.</span>
                                                    : null
                                            } */}

                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <Row>
                                                <Col className="col-sm">

                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupText>
                                                        </InputGroupText>
                                                        <Input
                                                            placeholder="주민번호"
                                                            type="text"
                                                            value={ssn1}
                                                            onKeyUp={jumpSsn}
                                                            id="ssn"
                                                            onChange={(e) =>
                                                                setSsn1(e.target.value)}
                                                        />
                                                    </InputGroup>

                                                </Col>

                                                <Col className="col-sm">
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupText>
                                                        </InputGroupText>
                                                        <Input
                                                            placeholder="주민번호"
                                                            type="password"
                                                            id="ssn2"
                                                            value={ssn2}
                                                            maxLength="7"
                                                            onChange={onChangeInputSsn}

                                                        />
                                                    </InputGroup>

                                                </Col>
                                            </Row>
                                            {/* {   validSsn  === "false"
                                                    ? <span style={{ color: "red" }}>주민번호 13자리를 입력해주세요.</span>
                                                    : nullCheckSsn
                                                        ? <span style={{ color: "red" }}>주민번호가 비어 있습니다.</span>
                                                        : null
                                            } */}

                                            {validSsn === "true" 
                                                ? null
                                                : validSsn === "false"
                                                    ? <span style={{ color: "red" }}>주민번호는 13자리입니다.</span>  
                                                    :<span style={{ color: "red" }}> 주민번호가 비어 있습니다.</span>  

                                            }

                                        </FormGroup>



                                        <FormGroup className="mb-3">
                                            <Row>
                                                <Col className="col-sm">
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupText>
                                                        </InputGroupText>
                                                        <Input
                                                            placeholder="전화번호"
                                                            type="text"
                                                            id="cellPhone1"
                                                            value={phone1}
                                                            maxLength={3}
                                                            // onkeyup={(e) => {
                                                            //   value = autoHypenPhone(e.target.value.trim());
                                                            //   }
                                                            // }
                                                            // onChange={handleChange}
                                                            onChange={(e) => setPhone1(e.target.value)}
                                                            onKeyUp={jumpPhone}

                                                        // autoComplete="new-id"
                                                        />
                                                    </InputGroup>

                                                </Col>

                                                <Col className="col-sm">
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupText>
                                                        </InputGroupText>
                                                        <Input
                                                            placeholder="전화번호"
                                                            type="text"
                                                            id="cellPhone2"
                                                            maxLength={4}
                                                            value={phone2}
                                                            // onkeyup={(e) => {
                                                            //   value = autoHypenPhone(e.target.value.trim());
                                                            //   }
                                                            // }
                                                            // onChange={handleChange}
                                                            onChange={(e) => setPhone2(e.target.value)}
                                                            onKeyUp={jumpPhone2}


                                                        // autoComplete="new-id"
                                                        />
                                                    </InputGroup>

                                                </Col>

                                                <Col className="col-sm">
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupText>
                                                        </InputGroupText>
                                                        <Input
                                                            placeholder="전화번호"
                                                            type="text"
                                                            id="cellPhone3"
                                                            maxLength={4}
                                                            value={phone3}
                                                            // onkeyup={(e) => {
                                                            //   value = autoHypenPhone(e.target.value.trim());
                                                            //   }
                                                            // }
                                                            // onChange={handleChange}
                                                            onChange={onChangeInputPhone}

                                                        // autoComplete="new-id"
                                                        />
                                                    </InputGroup>

                                                </Col>
                                            </Row>


                                        </FormGroup>
                                        {/* { validPhone === "false"
                                            ? <span style={{ color: "red" }}>전화번호 형식에 맞춰 입력하세요</span>
                                            :  nullCheckPhone
                                                ? <span style={{ color: "red" }}>전화번호가 비어있습니다.</span>
                                                : null
                                        } */}


                                        {validPhone === "true"                                    
                                                ? null
                                                : validPhone === "false"
                                                    ? <span style={{ color: "red" }}>전화번호 형식에 맞춰 입력하세요.</span>  
                                                    :<span style={{ color: "red" }}> 전화번호가 비어 있습니다.</span>  

                                            }
                                        <FormGroup className="mb-3">

                                            <Row>
                                                <Col>
                                                    <div className="custom-control custom-radio mb-3">
                                                        <input
                                                            className="custom-control-input"
                                                            defaultChecked = {user.gender === "M"}
                                                            id="customRadio5"
                                                            name="custom-radio-2"
                                                            type="radio"
                                                            value={"M"}
                                                            // onChange={onChangeInputGender}
                                                            
                                                            // checked = {user.gender === "M"}
                                                            onChange={(e) => setUser(Object.assign({}, user, { gender: e.target.value }))}


                                                        />
                                                        <label className="custom-control-label" htmlFor="customRadio5">
                                                            남자
                                                        </label>
                                                    </div>

                                                    <div className="custom-control custom-radio mb-3">
                                                        <input
                                                            className="custom-control-input"
                                                            defaultChecked = {user.gender === "F"}
                                                            id="customRadio6"
                                                            name="custom-radio-2"
                                                            type="radio"
                                                            value={"F"}
                                                            // onChange={onChangeInputGender}
                                                            // checked = {user.gender === "F"}
                                                            onChange={(e) => setUser(Object.assign({},user, { gender: e.target.value }))}

                                                        />
                                                        <label className="custom-control-label" htmlFor="customRadio6">
                                                            여자
                                                        </label>
                                                    </div>
                                                </Col>
                                             
                                                <Col>
                                                    <InputGroup className="input-group-alternative">

                                                        <select className="custom-select d-block w-100" id="root"

                                                            id="role"
                                                            name="role"
                                                            select key ={user.role}
                                                            default value={user.role}
                                                            // onChange={onChangeInputRole}
                                                            // onChange={(e) => setUser({ role: e.target.value })}
                                                            onChange={(e) => setUser(Object.assign({}, user, { role: e.target.value }))}
                                                        >
                                                            <option value='1'>원무과</option>
                                                            <option value='2'>간호사</option>
                                                            <option value='3'>수간호사</option>
                                                            <option value='4'>의사</option>
                                                            <option value='9'>관리자</option>
                                                        </select>
                                                        {/* // autoComplete="new-id" */}
                                                    </InputGroup>

                                                </Col>
                                            </Row>
                                            {/* { nullCheckGender === true
                                                    ? <span style={{ color: "red" }}>성별은 필수 사항입니다.</span>
                                                    : null
                                                } */}

                                            {validGender === "true" 
                                                ? null
                                                : validGender === "false"
                                                    ? <span style={{ color: "red" }}>성별은 필수 사항입니다.</span>  
                                                    :<span style={{ color: "red" }}> 성별은 필수 사항입니다.</span>  

                                            }
                                        </FormGroup>
                                        {/* <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">

                                                <select className="custom-select d-block w-100" id="root"

                                                    id="role"
                                                    name="role"
                                                    value={user.role}
                                                    onChange={(e) => setUser(Object.assign({}, user, { role: e.target.value }))}
                                                >
                                                    <option value='1'>원무과</option>
                                                    <option value='2'>간호사</option>
                                                    <option value='3'>수간호사</option>
                                                    <option value='4'>의사</option>
                                                    <option value='9'>관리자</option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup> */}

                                        <FormGroup className="mb-3">
                                            <Row>
                                                <Col className="col-sm">
                                                    <InputGroup className="input-group-alternative">
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                        <Input
                                                            placeholder=""
                                                            type="text"
                                                            value={isZoneCode}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        color="success"
                                                        type="button"
                                                        onClick={() => setPostModal({ isOpen: true })}>
                                                        우편번호
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 주소 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="주소"
                                                    type="text"
                                                    value={isAddress}
                                                    // value={userAddr()}
                                                    onClick={() => setPostModal({ isOpen: true })}
                                                    // onChange={(e) => setisAddress(, { addr: isAddress }))}
                                                />

                                            </InputGroup>

                                        </FormGroup>
                                        {/* {
                                            isAddress !== "" ?
                                                null :
                                                validAddress ?
                                                    null
                                                    : <span style={{ color: "red" }}>주소는 필수상항입니다.</span>
                                        } */}
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    {/* 주소 입력창 icon */}
                                                    <InputGroupText>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="상세주소"
                                                    type="text"
                                                    value={isDetailAddress}
                                                    onChange={onChangeInputAddr}
                                                    // onChange={(e) => setIsDetailAddress( e.target.value )}
                                                    
                                                // autoComplete="new-id"
                                                />

                                            </InputGroup>

                                        </FormGroup>
                                       
                                        {validAddr === "true"                                    
                                                ? null
                                                : validAddr === "false"
                                                    ? <span style={{ color: "red" }}> 주소는 필수 사항입니다.</span>  
                                                    :<span style={{ color: "red" }}> 주소는 필수 사항입니다.</span>  

                                            }
                                        {/* {

                                            validName && validId &&validSsn && validPwd && validPwd2 && validPhone && validAddress ?
                                                null :
                                                validRegister ?

                                                    <span style={{ color: "red" }}>형식에 맞게 입력해주세요.</span> :
                                                    null

                                        } */}

                                        
                                        {/* 등록하기 버튼 */}
                                        <div className="text-center">
                                            <Button
                                                className="my-4"
                                                color="success"
                                                // type="submit"
                                                onClick={onClickRegister}
                                            > 등록하기

                                            </Button>
                                        </div>
                                    </Form>
          <Modal
          className="modal-dialog-centered"
          size="m"
          isOpen={postModal.isOpen}
          
          toggle={() => setPostModal({isOpen : false})}
        >

          <div className="addr-api-modal-header">
          <DaumPostcode style={postCodeStyle} onComplete={handleComplete}   />

            <h5 className="modal-title" id="exampleModalLabel">
            <br/><br/>
            </h5>
            <button
              aria-label="Close" 
              className="close"
              data-dismiss="modal"
              type="button"
              style = {addrApiModal}
              onClick={() => setPostModal({isOpen : false})}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <br/>
          </div>

        </Modal>

                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </>
    );

}
export default UserAddModal3;