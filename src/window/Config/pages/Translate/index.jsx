import React from 'react';
import { DropdownTrigger } from '@nextui-org/react';
import { DropdownMenu } from '@nextui-org/react';
import { DropdownItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { CardBody } from '@nextui-org/react';
import { Dropdown } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card } from '@nextui-org/react';

import { useConfig } from '../../../../hooks/useConfig';
import { languageList } from '../../../../utils/language';
import { invoke } from '@tauri-apps/api';

export default function Translate() {
    const [sourceLanguage, setSourceLanguage] = useConfig('translate_source_language', 'auto');
    const [targetLanguage, setTargetLanguage] = useConfig('translate_target_language', 'zh_cn');
    const [secondLanguage, setSecondLanguage] = useConfig('translate_second_language', 'en');
    const [autoCopy, setAutoCopy] = useConfig('translate_auto_copy', 'disable');
    const [incrementalTranslate, setIncrementalTranslate] = useConfig('incremental_translate', false);
    const [dynamicTranslate, setDynamicTranslate] = useConfig('dynamic_translate', false);
    const [deleteNewline, setDeleteNewline] = useConfig('delete_newline', false);
    const [rememberLanguage, setRememberLanguage] = useConfig('translate_remember_language', false);
    const [rememberWindowSize, setRememberWindowSize] = useConfig('translate_remember_window_size', false);
    const [hideSource, setHideSource] = useConfig('hide_source', false);
    const [hideLanguage, setHideLanguage] = useConfig('hide_language', false);
    const [hideWindow, setHideWindow] = useConfig('translate_hide_window', false);

    const { t } = useTranslation();

    return (
        <>
            <Card className='mb-[10px]'>
                <CardBody>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.source_language')}</h3>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant='bordered'>{t(`languages.${sourceLanguage}`)}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label='source language'
                                className='max-h-[50vh] overflow-y-auto'
                                onAction={(key) => {
                                    setSourceLanguage(key);
                                }}
                            >
                                <DropdownItem key='auto'>{t('languages.auto')}</DropdownItem>
                                {languageList.map((item) => {
                                    return <DropdownItem key={item}>{t(`languages.${item}`)}</DropdownItem>;
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.target_language')}</h3>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant='bordered'>{t(`languages.${targetLanguage}`)}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label='target language'
                                className='max-h-[50vh] overflow-y-auto'
                                onAction={(key) => {
                                    setTargetLanguage(key);
                                }}
                            >
                                {languageList.map((item) => {
                                    return <DropdownItem key={item}>{t(`languages.${item}`)}</DropdownItem>;
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.second_language')}</h3>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant='bordered'>{t(`languages.${secondLanguage}`)}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label='second language'
                                className='max-h-[50vh] overflow-y-auto'
                                onAction={(key) => {
                                    setSecondLanguage(key);
                                }}
                            >
                                {languageList.map((item) => {
                                    return <DropdownItem key={item}>{t(`languages.${item}`)}</DropdownItem>;
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </CardBody>
            </Card>
            <Card className='mb-[10px]'>
                <CardBody>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.auto_copy')}</h3>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant='bordered'>{t(`config.translate.${autoCopy}`)}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label='auto copy'
                                className='max-h-[50vh] overflow-y-auto'
                                onAction={(key) => {
                                    setAutoCopy(key);
                                    invoke('update_tray', { language: '', copyMode: key });
                                }}
                            >
                                <DropdownItem key='source'>{t('config.translate.source')}</DropdownItem>
                                <DropdownItem key='target'>{t('config.translate.target')}</DropdownItem>
                                <DropdownItem key='source_target'>{t('config.translate.source_target')}</DropdownItem>
                                <DropdownItem key='disable'>{t('config.translate.disable')}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.incremental_translate')}</h3>
                        <Switch
                            isSelected={incrementalTranslate}
                            onValueChange={(v) => {
                                setIncrementalTranslate(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.dynamic_translate')}</h3>
                        <Switch
                            isSelected={dynamicTranslate}
                            onValueChange={(v) => {
                                setDynamicTranslate(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.delete_newline')}</h3>
                        <Switch
                            isSelected={deleteNewline}
                            onValueChange={(v) => {
                                setDeleteNewline(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.remember_language')}</h3>
                        <Switch
                            isSelected={rememberLanguage}
                            onValueChange={(v) => {
                                setRememberLanguage(v);
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.remember_window_size')}</h3>
                        <Switch
                            isSelected={rememberWindowSize}
                            onValueChange={(v) => {
                                setRememberWindowSize(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.hide_source')}</h3>
                        <Switch
                            isSelected={hideSource}
                            onValueChange={(v) => {
                                setHideSource(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.hide_language')}</h3>
                        <Switch
                            isSelected={hideLanguage}
                            onValueChange={(v) => {
                                setHideLanguage(v);
                            }}
                        />
                    </div>
                    <div className='config-item'>
                        <h3 className='my-auto mx-0'>{t('config.translate.hide_window')}</h3>
                        <Switch
                            isSelected={hideWindow}
                            onValueChange={(v) => {
                                setHideWindow(v);
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
