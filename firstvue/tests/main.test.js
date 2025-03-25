import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '../src/App.vue';
import router from '../src/routs';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

describe('Vue App Initialization', () => {
  it('should initialize the app with Pinia and Router', () => {
    const app = createApp(App);

    const pinia = createPinia();
    app.use(pinia);
    app.use(router);
   

    expect(app).toBeTruthy();
    expect(pinia).toBeDefined();
    expect(router).toBeDefined();
  
  });

  it('should mount the App component successfully', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
