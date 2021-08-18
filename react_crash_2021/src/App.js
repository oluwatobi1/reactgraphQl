import Header from "./component/Header";
import React from 'react'



// // Using normal functions
// function App() {
//   return (
//     <div className="container">
//       <Header/>
//     </div>
//   );
// }


// // Using arrow functions
const App = ()=>{
  return (
    <div className="container">
      <Header title="Task Tracker"/>
    </div>
  )
}


// // Using classes
// class App extends React.Component {
//   render() {
//     return (
//       <div className="container">
//         <Header />
//       </div>
//     )
//   }
// }


export default App;
