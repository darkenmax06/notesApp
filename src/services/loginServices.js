const URI = "/api/login"


function login (user){
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers:{"content-type": "application/json"} 
  }

  return fetch(URI,options)
  .then(async (res) => {
    const result = await res.json()
    if (!res.ok) throw result.error
    return result
  })
  .then(res => res)
}

export default { login }
