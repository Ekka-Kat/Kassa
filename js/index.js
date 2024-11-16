const data = [
    {
        id: 123,
        title: 'Молоко',
        price: 100,
        src: '',
    },
    {
        id: 321,
        title: 'Шоколад',
        price: 50,
        src: '',
    },
    {
        id: 231,
        title: 'Вода',
        price: 24,
        src: '',
    },
    {
        id: 412,
        title: 'Хлеб',
        price: 33,
        src: '',
    },
]

let cart = []
const form = document.querySelector('.form')
const cartUI = document.querySelector('.cart')
const total = document.querySelector('.total')
const print = document.querySelector('.print')
const search = document.querySelector('.search')
const searchInput = document.querySelector('.searchInput')
const plusItem = document.querySelector('.plusItem')


searchInput.addEventListener('input', (e) => {
    items = data.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    search.textContent = items.map((el) => `${el.title} -- ${el.id}`)
    
})

const getItemData = (item) => {
    if(item.count){
        return `${item.title + ' x' + item.count} ----------------------- ${item.price * item.count}р \n`
    } else {
        return `${item.title} ----------------------- ${item.price}р \n`
    }
} 

const printTotal = (cart) => {
    const totalCart = cart.map((el) => getItemData(el))
    alert(totalCart)   
}

const setItemInUICart = (item) => {        
    const itemUI = document.createElement('div')
    itemUI.textContent = getItemData(item)     
    return itemUI
}

const getItem = (item) => {
    const element = cart.find(el => el.id === item.id)
    const elementIndex = cart.findIndex(el => el.id === item.id)

    if(Boolean(element)) {
        cart.splice(elementIndex, 1)
        return {    
            ...element,
            count: element.count ? element.count + 1 : 2
        }   
    }
    return item
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const item = data.find(el => el.id === e.target[0].valueAsNumber)

    if(item) {
        cart.push(getItem(item))
        e.target[0].value = ''
    } else {
        alert('Товар не найден')
    }

    while (cartUI.firstChild) {
        cartUI.firstChild.remove()
    }

    cart.forEach((el) => {
        cartUI.appendChild(setItemInUICart(el))
        cartUI.appendChild(addButtonPlus(el))
        cartUI.appendChild(addButtonMinus(el))
        console.log('cartUI',cartUI)
        console.log('cart',cart)
    })

    total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`
})

print.addEventListener('click', () => {
    printTotal(cart)
})

const addButtonPlus = (el) => {
    const plus = document.createElement('button')
    plus.textContent = '+'
    plus.classList.add('plusItem')
    plus.id = el.id
    console.log(plus.id)
    return plus
}

const addButtonMinus = (el) => {
    const minus = document.createElement('button')
    minus.textContent = '-' 
    minus.classList.add('minusItem')
    minus.id = el.id 
    return minus  
}

document.addEventListener("click", (e) => {
    console.log("EventListner")
    if (hasClass(e.target, 'plusItem')) {      
        const m = cart.find (el => el.id === Number(e.target.id))  
        cart.push(getItem(m))
        console.log('new cart',cart)
        while (cartUI.firstChild) {
            cartUI.firstChild.remove()
        }    
        cart.forEach((el) => {
            cartUI.appendChild(setItemInUICart(el))
            cartUI.appendChild(addButtonPlus(el))
            cartUI.appendChild(addButtonMinus(el))
        }) 
        total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`           
    }         
})
 
const hasClass = (elem, className) => {
    return elem.classList.contains(className)
}

document.addEventListener("click", (e) => {
    console.log("EventListner")
    if (hasClass(e.target, 'minusItem')) {      
        const m = cart.find (el => el.id === Number(e.target.id)) 
        const elementIndex = cart.findIndex(el => el.id === Number(e.target.id))
        const amount = cart.reduce(el => el==m)
        if (amount.count) {
            console.log('amount',amount)       
            cart.push(decreaseItem(m))    
            while (cartUI.firstChild) {
                cartUI.firstChild.remove()
            }    
            cart.forEach((el) => {
                cartUI.appendChild(setItemInUICart(el))
                cartUI.appendChild(addButtonPlus(el))
                cartUI.appendChild(addButtonMinus(el))
            }) 
            total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`           
        } 
        else {
            cart.splice(elementIndex, 1)
            console.log(cart)
            while (cartUI.firstChild) {
                 cartUI.firstChild.remove()
            }
            cart.forEach((el) => {
                cartUI.appendChild(setItemInUICart(el))
                cartUI.appendChild(addButtonPlus(el))
                cartUI.appendChild(addButtonMinus(el))
            }) 
            total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`
        } 
    }            
})

const decreaseItem = (item) => {
    const element = cart.find(el => el.id === item.id)
    const elementIndex = cart.findIndex(el => el.id === item.id)

    if(Boolean(element)) {
        cart.splice(elementIndex, 1)
        return {    
            ...element,
            count: element.count>2 ? element.count - 1 : 0
        }   
    }
    return item
}
