import xs from 'xstream'

export default function (){

  let next = null
  const producer = {
    start : function(listener){
      next = listener
    },
    stop : () => {
    }
  }

  const stream = xs.create(producer)

  return {
    dispatch : (value) => stream.shamefullySendNext(value),
    stream
  }
}