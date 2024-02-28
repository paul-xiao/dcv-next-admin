import type { Meta, StoryObj } from '@storybook/vue3';

import Form from '../../src/components/IForm';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Components/Form',
  component: Form,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    modelSize: { control: 'select', options: ['small', 'default', 'large'] },
  },
  args: { modelSize: 'default' }, // default values
} satisfies Meta<typeof Form>;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Form },
  template: '<Form><slot></slot></Form>',
});

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    modelSize: 'default',
    foot: false,
    modelValue: { title: '测试' },
    rules: {
      title: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur',
        },
      ],
    },
    schema: [
      {
        label: '标题',
        prop: 'title',
        span: 12,
      },
    ],
  },
};
export const Large: Story = {
  args: {
    modelSize: 'large',
  },
};

export const Small: Story = {
  args: {
    modelSize: 'small',
  },
};
