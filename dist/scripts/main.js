const total_Bill = document.getElementById('bill_amount');
const no_of_people = document.getElementById("no_of_people");
const tips_buttons = document.getElementsByClassName("percent");
const custom_label = document.getElementById("custom_label");
const custom_input = document.getElementById("custom_percent");
const tip_amount = document.getElementById("tip_per_person");
const total_per_person = document.getElementById("total_per_person");
const message = document.getElementById("error");

document.getElementById("reset").addEventListener("click",x => {
    Reset();
})
var t_Bill = total_Bill.value;
var n_People = no_of_people.value;
var tip = 0;
var custom = false;

for( let i = 0; i< tips_buttons.length; i++)
{
    if (i == tips_buttons.length - 1)
    {
        tips_buttons[i].addEventListener( "click",x => {
            custom_label.classList.add("hide");
            custom_input.classList.remove("hide");
            tips_buttons[i].classList.add("selected");
            tip = custom_input.value;
            custom = true;
            RemoveSelection(i);
        })
    }
    else
    {
        tips_buttons[i].addEventListener( "click",x => {
            tips_buttons[i].classList.add("selected");
            // console.log(tips_buttons[i].value);
            tip = tips_buttons[i].value;
            Update();
            RemoveSelection(i);
            
        })
    }
    
}

total_Bill.addEventListener("change",x => {
    t_Bill = total_Bill.value;
    Update();
})

no_of_people.addEventListener("change",x => {
    n_People = no_of_people.value;
    Update();
})


custom_input.addEventListener("change",x => {
    if (custom == true)
    {
        tip = custom_input.value;
        Update();
    }
})

function Update()
{
    let tipPerPerson = 0.00;
    let totalPerPerson = 0.00;

    let total = t_Bill * (1 + tip/100);

    if(n_People != 0)
    {
        totalPerPerson = total/n_People;
        tipPerPerson = (total - t_Bill)/n_People;
        tip_per_person.innerHTML = `$${tipPerPerson.toFixed(2)}`;
        total_per_person.innerHTML = `$${totalPerPerson.toFixed(2)}`;
        if(!error.classList.contains("hide"))
            error.classList.add("hide");
        if(no_of_people.classList.contains("input_form_error_outline"))
        {
            no_of_people.classList.remove("input_form_error_outline");
        }
    }
    else
    {
        //error handling
        if(error.classList.contains("hide"))
        {
            error.classList.remove("hide");
        }

        if(!no_of_people.classList.contains("input_form_error_outline"))
        {
            no_of_people.classList.add("input_form_error_outline");
        }
    }
}

function Reset()
{

    t_Bill= 0;
    n_People = 0;
    tip = 0;
    if(!error.classList.contains("hide"))
    {
        error.classList.add("hide");
    }
    if(no_of_people.classList.contains("input_form_error_outline"))
    {
        no_of_people.classList.remove("input_form_error_outline");
    }

    RemoveSelection(-1);
    total_Bill.value = 0;
    no_of_people.value = 0;
    tip_per_person.innerHTML = `$0.00`;
    total_per_person.innerHTML = `$0.00`;
}

function RemoveSelection(index){
    for(let i = 0; i< tips_buttons.length; i++)
    {
        if( i == index)
        {
            continue;
        }
        else
        {
            if (i == tips_buttons.length - 1)
            {
                custom_label.classList.remove("hide");
                custom_input.classList.add("hide");
                custom = false;
            }
            tips_buttons[i].classList.remove("selected");
        }
    }
}