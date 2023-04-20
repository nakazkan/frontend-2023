import React from "react";
import styles from "./EditForm.module.scss";
import { connect } from "react-redux";
import { useState } from "react";
import { actionChangeTheme } from "../../common/store/actions/changeTheme";
import { actionChangeData } from "../../common/store/actions/changeData";

const mapStateToProps = (state) => ({
  theme: state.themeReducer.theme,
  data: state.dataReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeData: (data) => dispatch(actionChangeData(data)),
  changeTheme: () => dispatch(actionChangeTheme()),
});

function Manager({ post, fieldName, theme, data, changeData, changeTheme }) {
  const [field, setfField] = useState(
    fieldName === "текст" ? post.text : post.title
  );
  const [isEdit, setIsEdit] = useState(false);
  const [editStr, setEditStr] = useState("Изменить " + fieldName);

  const handleChangeField = (event) => {
    setfField(event.target.value);
  };

  const changeEditField = () => {
    if (isEdit) {
      changeData(data - 1);
      if (data === 1) {
        changeTheme();
      }
      setIsEdit(false);
      setEditStr("Изменить " + fieldName);
    } else {
      if (data === 0) {
        changeTheme();
      }
      changeData(data + 1);
      setIsEdit(true);
      setEditStr("Отменить изменения");
    }
  };

  const onSubmitField = (event) => {
    if (fieldName === "текст") {
      post.text = field;
    } else {
      post.title = field;
    }
    setIsEdit(false);
    setEditStr("Изменить " + fieldName);
    changeData(data - 1);
    if (data === 1) {
      changeTheme();
    }
    event.preventDefault();
  };

  return (
    <div className={styles.edit}>
      {!isEdit ? (
        <div>{fieldName === "текст" ? post.text : post.title}</div>
      ) : (
        <form>
          <div>
            <input
              value={field}
              placeholder={fieldName[0].toUpperCase() + fieldName.substr(1)}
              onChange={handleChangeField}
            ></input>
          </div>
          <button type="submit" onClick={onSubmitField}>
            Сохранить изменения
          </button>
        </form>
      )}
      <button className={styles.edit_button} onClick={changeEditField}>
        {editStr}
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
