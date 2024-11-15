export async function updateUserData(userId: number | undefined, token: string | undefined, updatedData: any) {
  try {
    const formData = new FormData
    if (!updatedData.image[0]) {
      delete updatedData.image
    }
    console.log(updatedData)
    const response = await fetch(process.env.BACKEND_API_URL + `/auth/update-user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update user data: ${response.status} - ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}