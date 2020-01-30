$(document).ready(()=>{
    
    $('#talk-form').on('submit', (e)=>{
       e.preventDefault();
       $('#submit-talk').attr("disabled", true)
       let newTalk = $('#new-talk').val();
       let data = {title: newTalk}
       let form_data = JSON.stringify(data);
       $.ajax({
           type: "POST",
           url: "/talk",
           data: form_data,
           contentType: "application/json",
           success: (newTalk)=>{
            console.log(newTalk);
            location.reload();
           },
           error: ()=>{
               alert('Error adding new Talk');
           }
       })
    })

    
})