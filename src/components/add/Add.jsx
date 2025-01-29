import React from "react";
import "./add.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const Add = ({ onClose }) => {
  const { register, handleSubmit } = useForm();

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  const addData = async (data) => {
    try {
      await axios.post("https://13dokon-server.vercel.app/api/add", data);
      notyf.success("Готово! Продукт добавлен.");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      notyf.error("Ошибка при добавлении продукта.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit(addData)} className="form">
          <input
            type="text"
            placeholder="URL изображения"
            {...register("rasm", { required: true })}
          />
          <input
            type="text"
            placeholder="URL иконки"
            {...register("icon", { required: true })}
          />
          <input
            type="text"
            placeholder="Название"
            {...register("nomi", { required: true })}
          />
          <input
            type="text"
            placeholder="Информация"
            {...register("malumoti", { required: true })}
          />
          <input
            type="text"
            placeholder="Тип #"
            {...register("turi", { required: true })}
          />
          <input
            type="number"
            placeholder="Количество"
            {...register("soni", { required: true })}
          />
          <input
            type="number"
            placeholder="Цена"
            {...register("narxi", { required: true })}
          />
          <input
            type="number"
            placeholder="Тон-цена"
            {...register("ton", { required: true })}
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
