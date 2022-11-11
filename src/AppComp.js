
import logo from './logo.svg';
import './App.css';
import React,{ useState } from 'react';

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};

const KanbanNewCard = ({onSubmit}) => {

  const[title,setTitle] = useState('')

  const handleChange = (evt)=>{
    setTitle(evt.target.value)
  }

  const handleKeydown = (evt)=>{
    if (evt.key === 'Enter'){
      onSubmit(title)
    }
  }

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeydown}/>
      </div>
    </li>
  );
};


const KanbanBoard = ({ children }) => (
  <main className="kanban-board">{children}</main>
);

const KanbanColumn = ({ children, className,title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};


function App() {

  //处理todo卡片的新增
  const [showAdd,setShowAdd] = useState(false);

  const [todoList,setTodoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' }
  ]);

  const handleAdd = (evt) => {
    setShowAdd(true);
  };

  const handleSubmit = (title)=>{
    //todoList.unshift({title,status:new Date().toDateString});
    setTodoList(currentTodoList =>[
      {title,status:new Date().toDateString()},
        ...currentTodoList
    ]);
    //setShowAdd(false)
  };

  //处理进行中的卡片的新增
  const [showOngoAdd,setShowOngoAdd] = useState(false);
  const [ongoList,setOngoList] = useState([
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' }
  ])

  const handleOngoAdd = (evt) =>{
    setShowOngoAdd(true)
  }

  const handleOngoSubmit = (title)=>{
    setOngoList(currentOngoList =>[
      {title,status:new Date().toDateString()},
        ...currentOngoList
    ]);
  };

  //处理已完成卡片的新增
  const [showDoneAdd,setShowDoneAdd] = useState(false);
  const [doneList,setDoneList] = useState([
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' }
  ]);

  const handleDoneAdd = (evt) =>{
    setShowDoneAdd(true)
  }

  const handleDoneSubmit = (title)=>{
    setDoneList(currentDoneList =>[
      {title,status:new Date().toDateString()},
        ...currentDoneList
    ]);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={
          <>
          待处理<button onClick={handleAdd} disabled={showAdd}>&#8853;添加新卡片</button>
          </>
        }>
            {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
            {
              todoList.map(props => <KanbanCard key={props.title} {...props}/>)
            }
        </KanbanColumn>
        <KanbanColumn className = "column-ongoing" title={
          <>
          进行中<button onClick={handleOngoAdd} disabled={showOngoAdd}>&#8853;添加新卡片</button>
          </>
        }>
              {showOngoAdd && <KanbanNewCard onSubmit={handleOngoSubmit}/>}
            {
              ongoList.map(props => <KanbanCard key={props.title} {...props}/>)
            }
        </KanbanColumn>
        <KanbanColumn className="column-done" title={
          <>
          已完成<button onClick={handleDoneAdd} disabled={showDoneAdd}>&#8853;添加新卡片</button>
          </>
        }>
            {showDoneAdd && <KanbanNewCard onSubmit={handleDoneSubmit}/>}
            {
              doneList.map(props => <KanbanCard key={props.title} {...props}/>)
            }
        </KanbanColumn>
      </KanbanBoard>
    </div>
      );
    }

export default App;