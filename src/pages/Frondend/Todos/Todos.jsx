import { AuthContext } from 'context/AuthContext'
import React, { useState, useContext, useEffect } from 'react'
import { getDocs, collection, deleteDoc, doc, setDoc, serverTimestamp,where,query } from "firebase/firestore/lite";
import { firestore } from 'config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';





const initialState = {
  title: ``,
  location: ``,
  discription: ``
}
export default function Todos() {




  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)


  const { user } = useContext(AuthContext)

  const [state, setState] = useState(initialState)





  const handleChange = (e) => {
    setTodo(s => ({ ...s, [e.target.name]: e.target.value }))


  }


  const handleDelete = async (todo) => {
    console.log(todo)
    setIsProcessingDelete(true)
    try {
      await deleteDoc(doc(firestore, "todos", todo.id))
      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id

      })

      setDocuments(newDocuments)
      window.notify("Todo has Delete succes fully", "success")


    } catch (err) {
      console.log(err)
      window.notify("Something went Wrong", "error")
    }
    setIsProcessingDelete(false)

  }

  const fetchDocument = async () => {
    let array = []

    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
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
  }, [user])
  const handleUpdate = async (todo) => {

    let formData = { ...todo }
    formData.dateCreated = formData.dateCreated;
    formData.dateModified = serverTimestamp()
    formData.modifiedBy = {
      email: user.email,
      uid: user.uid
    }
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "todos", formData.id), todo, { merge: true });
      window.notify("Todo has beed Added successfully ", "success")

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id)
          return todo
        return doc
      })
      setDocuments(newDocuments)

    } catch (err) {
      console.error(err)
      window.notify("SomeThing went Wrong", "error")
    }
    setIsProcessing(false)
  }



  return (
    <>

      {/* <!-- Modal -->  */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit TODO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6 mb-3 ">
                  <input type="text" className="form-control" value={todo.title} name='title' placeholder="Title" onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3 ">
                  <input type="text" className="form-control" value={todo.location} name='location' placeholder="Enter Location" onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col ">
                  <textarea className="form-control" name='discription' value={todo.discription} placeholder="Enter Description" rows="5" onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <select name="status" className='form-control' value={todo.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">InActive</option>
                  </select>

                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { handleUpdate(todo) }} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
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
                  ? <Table>
                    <Thead>
                      <Tr>
                        <Th>S. No</Th>
                        <Th>Title</Th>
                        <Th>Location</Th>
                        <Th>Discription</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {documents.map((todo, i) => {
                        return <Tr key={i}>
                          <Td>{i + 1}</Td>
                          <Td>{todo.title}</Td>
                          <Td>{todo.location}</Td>
                          <Td>{todo.discription} </Td>
                          <Td>{todo.status}</Td>
                          <Td> <button className='btn btn-primary btn-sm m-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }}  >{!isProcessing
                            ?
                            "Edit"
                            :
                            <div className="spinner-border spinner-border-sm"></div>
                          }</button>
                            <button className='btn btn-danger btn-sm' disabled={isProcessingDelete} onClick={() => { handleDelete(todo) }}>{!isProcessingDelete ?
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
    </>
  )
}
