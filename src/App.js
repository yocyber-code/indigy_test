import { useState } from 'react'
import './App.css'

function App() {
  let data1 = {
    id: '110036',
    name: 'สมชายใจดี',
    tel: '023-123-4125',
    position: 'โปรแกรมเมอร์',
  }
  const blankdata = {
    id: '',
    name: '',
    tel: '',
    position: '',
  }
  const [datas, setDatas] = useState([data1])
  const [editData, setEditData] = useState({ ...blankdata })
  const [isEdit, setisEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [mode, setMode] = useState(-1)

  function onNew() {
    setMode(0)
    setisEdit(true)
    setEditData({ ...blankdata })
  }

  function onEdit(data, index) {
    setMode(1)
    setEditIndex(index)
    setisEdit(true)
    setEditData({ ...data })
  }

  function onDelete(index) {
    if (window.confirm('ต้องการจะลบใช่ไหม')) {
      if (index !== -1) {
        setDatas([...datas.splice(index, 1)])
        console.log(index)
        if (datas.length === 0) {
          setDatas([])
        }
      }
    }
  }

  function onIdChange(e) {
    setEditData({
      id: e.target.value,
      name: editData.name,
      tel: editData.tel,
      position: editData.position,
    })
  }

  function onNameChange(e) {
    setEditData({
      id: editData.id,
      name: e.target.value,
      tel: editData.tel,
      position: editData.position,
    })
  }

  function onTelChange(e) {
    let phone = e.target.value
    if (!/^\d+$/.test(phone.charAt(phone.length - 1)) || phone.length > 12) {
      phone = phone.slice(0, phone.length - 1)
    }else if(phone.charAt(phone.length - 1) === '-'){
      phone = phone.slice(0, phone.length - 2)
    }
    else if ((phone.length === 3 || phone.length === 7) && phone.charAt(phone.length - 1) != '-') {
      phone += "-";
    }
    setEditData({
      id: editData.id,
      name: editData.name,
      tel: phone,
      position: editData.position,
    })
  }

  function onPositionChange(e) {
    setEditData({
      id: editData.id,
      name: editData.name,
      tel: editData.tel,
      position: e.target.value,
    })
  }

  function onConfirm() {
    if (mode === 0) {
      setDatas([...datas, editData])
    } else if (mode === 1) {
      setDatas([
        ...datas.slice(0, editIndex),
        editData,
        ...datas.slice(editIndex + 1, datas.length),
      ])
    }
    setisEdit(false)
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />

      {isEdit && (
        <div className="modal1">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                รหัสพนักงาน
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="รหัสพนักงาน"
              value={editData.id}
              onChange={onIdChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                ชื่อนามสกุล
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="ชื่อนามสกุล"
              value={editData.name}
              onChange={onNameChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                เบอร์โทร
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="เบอร์โทร"
              value={editData.tel}
              onChange={onTelChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                ตำแหน่ง
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              value={editData.position}
              onChange={onPositionChange}
            >
              <option value="โปรแกรมเมอร์">
                โปรแกรมเมอร์
              </option>
              <option value="ดีไซเนอร์">ดีไซเนอร์</option>
              <option value="ผู้จัดการโครงการ">ผู้จัดการโครงการ</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="button" className="btn btn-success" onClick={onConfirm}>
              ยืนยัน
            </button>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' , marginTop:'20px'}}>
        <h1>รายชื่อพนักงาน</h1>
        <button type="button" className="btn btn-success" style={{marginRight:'30px'}} onClick={onNew}>
          เพิ่ม
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">รหัสพนักงาน</th>
            <th scope="col">ชื่อ-นามสกุล</th>
            <th scope="col">เบอร์โทร</th>
            <th scope="col">ตำแหน่ง</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.name}</td>
              <td>{data.tel}</td>
              <td>{data.position}</td>
              <td>
                <button
                  className="btn btn-warning"
                  style={{marginRight:'10px'}}
                  onClick={() => onEdit(data, index)}
                >
                  แก้ไข
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(index)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
