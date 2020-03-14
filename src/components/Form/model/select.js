import React from 'react';
import { Select } from 'antd';
import $$ from 'cmn-utils';
import _ from 'lodash';
/**
 * 下拉菜单元件
 */
export default ({
  form,
  name,
  dict = [],
  dicttypecode,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  normalize,
  getPopupContainer,
  placeholder,
  preview,
  ...otherProps
}) => {
  const { getFieldDecorator, } = form;
  if(dicttypecode){
    dict = $$.getStore('dict');
    if(dict){
      dict = _.find(dict,{code:dicttypecode})['dict']
    }
  }
  let initval = initialValue;

  if (record) {
    initval = _.at(record,name)[0];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = `${normalize(initval)}`;
    } else {
      formFieldOptions.initialValue = `${initval}`;
    }
  }

  // 预览视图
  if (preview) {
    const _initval = $$.isArray(initval) ? initval : [initval];
    const dictObj = dict.filter(item => _initval.indexOf(item.code) !== -1);
    let text = '';
    if (dictObj.length) {
      text = dictObj.map(item => item.name).join(',');
    }
    return <div style={otherProps.style}>{text}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  const props = {
    placeholder: placeholder || `请选择${otherProps.title}`,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Select {...props}>
      {dict.map((dic, i) => (
        <Select.Option key={dic.code} value={dic.code} title={dic.name}>
          {dic.name}
        </Select.Option>
      ))}
    </Select>
  );
};