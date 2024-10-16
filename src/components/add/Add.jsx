import React from 'react'
import "./add.css"
import { useForm } from 'react-hook-form';
import axios from "axios"
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'; // for React, Vue and Svelte



const Add = ({ onClose }) => {
  const {
    register,
    handleSubmit,
  } = useForm()

  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top',
    },
  });

  const addData = (data) => {
    axios.post("https://13dokon-server.vercel.app/api/add", data) // Уберите лишний слэш
      .then(res => {
        notyf.success("Готово! Продукт теперь в каталоге.")
        onClose()
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        notyf.error("Ошибка при отправке данных")
      }
      )


  }



  return (
    <div className='modal'>
      <div className="modal-content">
        <span className='close' onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit(addData)} className='form'>
          <input type="text" name="rasm" id="" placeholder='Url изображения' {...register("rasm", { required: true })} />
          <input type="text" name="nomi" id="" placeholder='Названия' {...register("nomi", { required: true })} />
          <input type="text" name="malumoti" id="" placeholder='Информация' {...register("malumoti", { required: true })} />
          <input type="text" name="turi" id="" placeholder='Тип #' {...register("turi", { required: true })} />
          <input type="number" name="soni" id="" placeholder='Количество' {...register("soni", { required: true })} />
          <input type="number" name="narxi" id="" placeholder='Цена' {...register("narxi", { required: true })} />
          <input type="number" name="ton" id="" placeholder='Тон-цена' {...register("ton", { required: true })} />

          <button>Отправка данных</button>
        </form>
      </div>
    </div>
  )
}

export default Add
