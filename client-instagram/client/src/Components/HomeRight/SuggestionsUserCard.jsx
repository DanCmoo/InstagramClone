import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { followUserAction } from '../../Redux/User/Action'

const SuggestionsUserCard = ({image, username, description, userId, onFollowSuccess}) => {
  const dispatch = useDispatch()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem("token")

  const handleFollow = async () => {
    if (isLoading || isFollowing) return
    
    setIsLoading(true)
    
    try {
      const data = {
        userId: userId,
        jwt: token
      }
      
      await dispatch(followUserAction(data))
      setIsFollowing(true)
      
      // Llamar callback para actualizar la lista en el componente padre
      if (onFollowSuccess) {
        onFollowSuccess(userId)
      }
    } catch (error) {
      console.error('Error al seguir usuario:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <img className='w-9 h-9 rounded-full' src={image} alt="" />
            <div className='ml-2'>
            <p className='text-sm font-semibold text-black dark:text-gray-100'>{username}</p>
            <p className='text-sm font-semibold opacity-70 text-black dark:text-gray-300'>{description}</p>
            </div>
            </div>
            {isFollowing ? (
              <p className='text-gray-500 dark:text-gray-400 text-sm font-semibold'>Siguiendo</p>
            ) : (
              <button 
                onClick={handleFollow}
                disabled={isLoading}
                className='text-blue-700 dark:text-blue-400 text-sm font-semibold hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Siguiendo...' : 'Seguir'}
              </button>
            )}
    </div>
  )
}

export default SuggestionsUserCard