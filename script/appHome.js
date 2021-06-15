function changeTheme(arg) {

  let th = document.getElementById('theme');
  let selected = th.options[th.selectedIndex].text;
  console.log(selected);
  let m = document.getElementById('main');
  let h = document.getElementById('header');
  let f = document.getElementById('footer');
  switch(selected) {
  case 'Default':
    m.style.background = '#6b5340';
    h.style.background = 'wheat';
    f.style.background = 'wheat';
    m.style.color = 'black';
    break;
  case 'Black/White':
    m.style.background = 'black';
    h.style.background = 'white';
    f.style.background = 'white';
    m.style.color = 'white';
    break;
  case 'Mono':
    m.style.background = 'gray';
    h.style.background = 'gray';
    f.style.background = 'gray';
    m.style.color = 'black';
    break;
  default:
    m.style.background = '#6b5340';
    h.style.background = 'wheat';
    f.style.background = 'wheat';
    m.style.color = 'black';
    break;
  }
}
