const errorhandler = (err, req, res, next) => {
  if(err.name === "custom"){
    res.status(err.status).json({error: err.msg})
  }
  else{
    let error = "Server Error"
    res.status(500).json({error})
  }
}

module.exports = errorhandler