import { AuthContext } from 'context/AuthContext'
import React, { useState, useContext, useEffect } from 'react'
import { getDocs, collection, deleteDoc, doc} from "firebase/firestore/lite";
import { firestore } from 'config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';





const initialState = {
  title: ``,
  location: ``,
  discription: ``
}
export default function Todos() {


  const { user } = useContext(AuthContext)

  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(true)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)


  const handleDelete= async(todo)=>{
    console.log(todo)
    setIsProcessingDelete(true)
    try{
      await deleteDoc(doc(firestore,"todos",todo.id))
      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id 
       
    })
 
    setDocuments(newDocuments)
    window.notify("Todo has Delete succes fully","success")


    }catch(err){
      console.log(err)
      window.notify("Something went Wrong","error")
    }
    setIsProcessingDelete(false)

  }

  const fetchDocument = async () => {
    let array = []

    const querySnapshot = await getDocs(collection(firestore, "todos"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data.id = doc.id
      // console.log(data)
      array.push(data)

      // console.log(`${doc.id} => ${doc.data()}`);
    });

    setDocuments(array)
    setIsLoading(false)


  }
  useEffect(() => {
    fetchDocument()
  }, [])

  return (
    <div className="py-5 home d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row mx-2">
          <div className="col">
            <h2 className="text-center mb-4"> My  Todos </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card p-3 p-mb-4 p-lg-5">
              {!isLoading
              ?<Table>
                <Thead>
                  <Tr>
                    <Th>S. No</Th>
                    <Th>Title</Th>
                    <Th>Location</Th>
                    <Th>Discription</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((todo, i) => {
                    return <Tr key={i}>
                      <Td>{i +1}</Td>  
                      <Td>{todo.title}</Td>
                      <Td>{todo.location}</Td>
                      <Td>{todo.discription} </Td>
                      <Td> <button className='btn btn-primary btn-sm m-2' onClick={()=>{setTodo(todo)}} >Edit</button>
                      <button className='btn btn-danger btn-sm' disabled={isProcessingDelete} onClick={()=>{handleDelete(todo)}}>{!isProcessingDelete?
                      "Delete"
                      :
                      <div className="spinner-border spinner-border-sm"></div>
                      }</button></Td>
                    </Tr>
                  })

                  }

                </Tbody>
              </Table>
              : <div className="text-center"><div className="spinner-grow"></div></div>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
