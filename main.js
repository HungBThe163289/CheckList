const inputEl = document.getElementById('input-add')
const btnAddEl = document.getElementById('btn-add')
const checklistEl = document.getElementById('checklist')

let checklist = []

const handleCheckAll = () => {
    const inputCheckAllEl = document.getElementById('checkAll')
    const newChecklist = structuredClone(checklist)
    checklist = newChecklist.map(item => ({
        ...item,
        checked: inputCheckAllEl.checked
    }))
    console.log(inputCheckAllEl.checked)
    renderChecklist(checklist)
}

const renderChecklist = (checklist) => {
    let checklistHTML = 
        `
        <div onclick="handleCheckAll()" style="width: max-content">
            <input id="checkAll" type="checkbox" />
            <label for="checkAll">Check All</label>
        </div>      
        `
    for (let i = 0; i < checklist.length; i++) {
        checklistHTML += `
            <div class="check-item">
                <input type="checkbox" id="check-item-${checklist[i].id}" ${checklist[i].checked ? 'checked' : ''} />
                <label for="check-item-${checklist[i].id}">${checklist[i].name}</label>
            </div>
        `
    }
    checklistEl.innerHTML = checklistHTML
}

const clearValue = () => {
    inputEl.value = ''
}

btnAddEl.onclick = () => {
    if (!inputEl.value) {
        return
    }
    const newCheckItem = {
        id: checklist.length ? Math.max(...checklist.map(item => item.id)) + 1 : 1,
        name: inputEl.value,
        checked: false
    }
    const newChecklist = structuredClone(checklist)
    newChecklist.push(newCheckItem)
    checklist = newChecklist
    renderChecklist(checklist)
    clearValue()
}