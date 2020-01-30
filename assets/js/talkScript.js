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
            let list = document.querySelector('#talk-list');
            let item = document.createElement('a');
            item.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-primary');
            item.setAttribute('id', newTalk._id);
            item.href = "/talks/" + newTalk._id;
            item.innerHTML = newTalk.title;
            list.appendChild(item);
            alert('Talk Added.');
            $('#new-talk').val("");
            $('#submit-talk').attr("disabled", false);
           },
           error: (err)=>{
               alert('Server Error');
           }
       })
    })

    
})