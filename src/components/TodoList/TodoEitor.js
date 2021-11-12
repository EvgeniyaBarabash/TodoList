import IconButton from 'components/IconButton/IconButton';
import { Component } from 'react';
import './Todoeditor.scss';
class TodoEditor extends Component {
  state = {
    massage: '',
  };
  handleChange = e => {
    this.setState({ massage: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.massage);
    this.setState({ massage: '' });
  };
  render() {
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          className="TodoEditor__textarea"
          value={this.state.massage}
          onChange={this.handleChange}
        ></textarea>
        <IconButton
          type="submit"
          className="TodoEditor__button"
          aria-label="Save Todo"
        >
          Сохранить
        </IconButton>
        {/* <button type='submit' className="TodoEditor__button">Сохранить</button> */}
      </form>
    );
  }
}
export default TodoEditor;
