$(document).ready(()=>{
    
    $('#add-new-attendee').on('click', (e)=>{
        $('#attendees-form').show();
        $('#add-new-attendee').hide();
    })
    $('#attendees-form').on('submit', (e)=>{
        $('#submit').attr('disabled', true);
        e.preventDefault();
        let $name = $('#name').val();
        let $email = $('#email').val();
        let data = {
            name: $name,
            email: $email
        }

        let form_data = JSON.stringify(data);

        $.ajax({
            type: 'POST',
            url: '/attendee',
            data: form_data,
            contentType: "application/json",
            success: (attendee) => {
                let list = document.querySelector('#attendee-list');
                let item = document.createElement('li')
                item.innerHTML = attendee.name;
                item.classList.add('mt-4');
                list.appendChild(item);
                $('#name').val('');
                $('#email').val('');
                alert('New Attendee Added')
                $('#add-new-attendee').toggle();
                $('#submit').attr('disabled', false);
                $('#attendees-form').toggle();
            },
            error: (err) => {
                alert('Error Posting Attendee');
                console.log(err);
            }
        })
    })
})