import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../Contexts/AuthContext'

const DoctorProfile = () => {
  const { user } = useContext(Auth)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'http://localhost:3000'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
        })
        if (!res.ok) throw new Error('Failed to load profile')
        const data = await res.json()
        setProfile(data.getDoc)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchProfile()
  }, [user])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!profile) return <div className="p-4">No profile found</div>

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2">
        <div><span className="font-medium">Name:</span> {profile.name}</div>
        <div><span className="font-medium">Specialization:</span> {profile.specialization}</div>
        <div><span className="font-medium">Cost Per Visit:</span> ₹{profile.costPerVisit}</div>
      </div>
    </div>
  )
}

export default DoctorProfile
