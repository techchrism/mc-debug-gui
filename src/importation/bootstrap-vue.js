import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {
    ButtonPlugin,
    CardPlugin,
    LayoutPlugin,
    JumbotronPlugin,
    LinkPlugin,
    DropdownPlugin,
    ButtonGroupPlugin,
    FormInputPlugin,
    SpinnerPlugin,
    TablePlugin,
    ProgressPlugin,
    CollapsePlugin,
    AlertPlugin,
    InputGroupPlugin,
    PaginationPlugin,
    FormGroupPlugin,
    FormCheckboxPlugin
} from 'bootstrap-vue';

//import BootstrapVue from 'bootstrap-vue';

export default function importBootstrapVue(Vue)
{
    Vue.use(ButtonPlugin);
    Vue.use(CardPlugin);
    Vue.use(LayoutPlugin);
    Vue.use(JumbotronPlugin);
    Vue.use(LinkPlugin);
    Vue.use(DropdownPlugin);
    Vue.use(ButtonGroupPlugin);
    Vue.use(FormInputPlugin);
    Vue.use(SpinnerPlugin);
    Vue.use(TablePlugin);
    Vue.use(ProgressPlugin);
    Vue.use(CollapsePlugin);
    Vue.use(AlertPlugin);
    Vue.use(InputGroupPlugin);
    Vue.use(PaginationPlugin);
    Vue.use(FormGroupPlugin);
    Vue.use(FormCheckboxPlugin);
}
