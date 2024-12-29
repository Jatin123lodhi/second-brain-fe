import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { PlusIcon } from '../icons/PlusIcon'
import Button from '../components/Button'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { IContent } from '../hooks/useContent'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [content, setContent] = useState<IContent[]>([])
  const [contentModalActionType, setContentModalActionType] = useState<'Add' | 'Edit'>("Add")
  const [editableContent, setEditableContent]  = useState<IContent | null>(null)

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, { headers: { "Authorization": localStorage.getItem('token') } })
      console.log(res.data)
      setContent(res.data)
    } catch (error) {
      console.log(error, '  -----error')
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])


  const handleShareContent = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, { headers: { "Authorization": localStorage.getItem("token") } })
      alert(`Your shareable link : https://second-brain-35rwdyjzs-jatinmes-projects.vercel.app/brain/${res.data.hash}`)
    } catch (error) {
      alert("Something went wrong")
    }
  }

  const handleDelete = async (id: string) => {
    console.log('hihihi dlelete')
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, { headers: { "Authorization": localStorage.getItem("token") } })
      fetchContent()
    } catch (error) {
      alert("Something went wrong")
    }
  }
 
  const handleAddContent = () => {
    setShowModal(true)
    setContentModalActionType('Add')
  }

  const handleEdit = (c:IContent) => {
    console.log('hihihi edit',c)
    setShowModal(true)
    setContentModalActionType('Edit')
    setEditableContent(c)
  }

  return (
    <div><Sidebar handleFilter={() => console.log('hihi')} />
      <div className='ml-60'>
        <div className='flex justify-end gap-2 p-2'>
          <Button variant='primary' startIcon={<PlusIcon />} text='Add Content' onClick={handleAddContent} />
          <Button variant='secondary' startIcon={<ShareIcon />} text='Share' onClick={handleShareContent} />
        </div>
        <div className='flex gap-2 flex-wrap p-4 '>
          {content?.map(c => <Card handleEdit={() => handleEdit(c)} handleDelete={() => handleDelete(c.id)} link={c.link} title={c.title} key={c.id} type={c.type} id={c.id} />)}
        </div>
        <CreateContentModal initialContent={editableContent} actionType={contentModalActionType} open={showModal} onClose={() => setShowModal(false)} onSuccess={() => fetchContent()} />
      </div>
    </div>
  )
}

export default Dashboard