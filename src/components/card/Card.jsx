import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./card.css";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
// import Payment from '../payment/Payment';  // Импорт компонента Payment

const Card = () => {
  const [data, setData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [openPaymentModal, setOpenPaymentModal] = useState(false); // Состояние для модального окна оплаты

  useEffect(() => {
    axios.get('https://13dokon-server.vercel.app/api/getall')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [deleteState]);

  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete(`https://13dokon-server.vercel.app/api/delete/${id}`)
      .then(res => {
        setIsLoading(false);
        setDeleteState(prev => !prev);
      })
      .catch(error => {
        console.error("Ошибка при удалении продукта:", error);
        setIsLoading(false);
      });
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdate = (updatedProduct) => {
    axios.put(`https://13dokon-server.vercel.app/api/update/${editProduct._id}`, updatedProduct)
      .then(response => {
        setOpenEditModal(false);
        setDeleteState(prev => !prev);
      })
      .catch(error => {
        console.error('Ошибка при обновлении продукта:', error);
      });
  };

  // const showModal = () => {
  //   setOpenPaymentModal(true); // Открываем модальное окно оплаты
  // };

  // const closeModal = () => {
  //   setOpenPaymentModal(false); // Закрываем модальное окно оплаты
  // };

  return (
    <div className='card'>
      {data.map((item, index) => (
        <div className="box" key={index}>
          <img src={item.rasm} alt={item.nomi} className="product-image" />
          <div className="card__title">
            <img src={item.icon}  className="product-image" />
            <p>{item.nomi}</p>
   </div>
          <p>{item.malumoti}</p>
          <h4>{item.soni} количество</h4>
          <h4>{item.turi} тип</h4>
          <span>{item.narxi} $</span>
          <h4>{item.ton}тон</h4>
          {/* <Link >Sotib olish</Link> */}
          <div className="delete__create" style={{ display: 'flex', alignItems: "center", gap: "4px" }}>
            <button onClick={() => handleDelete(item._id)} disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} /> : 'Удалить'}
              {!isLoading && <DeleteIcon sx={{ color: "crimson", cursor: 'pointer' }} />}
            </button>
            <button onClick={() => handleEdit(item)}>
              Изменить
              <BorderColorIcon sx={{ color: "lightgreen", cursor: 'pointer' }} />
            </button>
          </div>
        </div>
      ))}

      {/* Модальное окно для изменения продукта */}
      {openEditModal && (
        <div className='modal'>
          <div className="modal-content">
            <span className='close' onClick={handleCloseEditModal}>&times;</span>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!editProduct) {
                return; // If editProduct is not set, don't proceed
              }

              const updatedProduct = {
                rasm: e.target.rasm.value,
                icon: e.target.icon.value, // Fixed typo here
                nomi: e.target.nomi.value,
                soni: e.target.soni.value,
                narxi: e.target.narxi.value,
                malumoti: e.target.malumoti.value,
                turi: e.target.turi.value,
                ton: e.target.ton.value,
              };

              handleUpdate(updatedProduct);
            }} className='form'>
              <input
                type="text"
                name="rasm"
                placeholder='Url изображения'
                defaultValue={editProduct?.rasm || ''}
              />
              <input
                type="text"
                name="icon" // Corrected name here
                placeholder='Url icon'
                defaultValue={editProduct?.icon || ''} // Corrected here
              />
              <input
                type="text"
                name="nomi"
                placeholder='Название'
                defaultValue={editProduct?.nomi || ''}
              />
              <input
                type="text"
                name="malumoti"
                placeholder='Информация'
                defaultValue={editProduct?.malumoti || ''}
              />
              <input
                type="text"
                name="turi"
                placeholder='Тип #'
                defaultValue={editProduct?.turi || ''}
              />
              <input
                type="number"
                name="soni"
                placeholder='Количество'
                defaultValue={editProduct?.soni || ''}
              />
              <input
                type="number"
                name="narxi"
                placeholder='Цена'
                defaultValue={editProduct?.narxi || ''}
              />
              <input
                type="number"
                name="ton"
                placeholder='Тон-цена'
                defaultValue={editProduct?.ton || ''}
              />
              <button type="submit">Сохранить изменения</button>
            </form>

          </div>
        </div>
      )}

     
    </div>
  );
};

export default Card;
