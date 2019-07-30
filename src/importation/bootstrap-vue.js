import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {
    Button,
    Card,
    Layout,
    Jumbotron,
    Link,
    Dropdown,
    ButtonGroup,
    FormInput,
    Spinner,
    Table,
    Progress,
    Collapse,
    Alert,
    InputGroup,
    Pagination,
    FormGroup,
    FormCheckbox
} from 'bootstrap-vue/es/components/';

//import BootstrapVue from 'bootstrap-vue';

export default function importBootstrapVue(Vue)
{
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Layout);
    Vue.use(Jumbotron);
    Vue.use(Link);
    Vue.use(Dropdown);
    Vue.use(ButtonGroup);
    Vue.use(FormInput);
    Vue.use(Spinner);
    Vue.use(Table);
    Vue.use(Progress);
    Vue.use(Collapse);
    Vue.use(Alert);
    Vue.use(InputGroup);
    Vue.use(Pagination);
    Vue.use(FormGroup);
    Vue.use(FormCheckbox);
    
    //Vue.use(BootstrapVue);
}
