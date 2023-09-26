import React from 'react';
import dayjs from 'dayjs';
import { Table } from 'antd';

const today = dayjs(new Date());
function TableShowLocation({
    setLocation,
    selectedLocation,
    setSelectedLocation,
    viewState,
    setViewState,
    gotoLocation,
    mapRef,
}: {
    setLocation: any;
    selectedLocation: any;
    setSelectedLocation: any;
    viewState: any;
    setViewState: any;
    gotoLocation: any;
    mapRef: any;
}) {
    const columns = [
        {
            title: 'Date',
            width: '10vw',
            dataIndex: ['properties', 'pk'],
            key: "properties['sk]",
            sorter: (a: any, b: any) => {
                return (
                    Number(a.properties.pk.replaceAll('-', '')) -
                    Number(b.properties.pk.replaceAll('-', ''))
                );
            },
            defaultSortOrder: 'ascend' as any,
            sortOrder: 'ascend' as any,
            sortDirections: [''] as any,
            filteredValue: [''],
            onFilter: (value: any, record: any) => {
                const isToday = dayjs(record.properties.pk).isSame(
                    today,
                    'day'
                );
                const isFuture = dayjs(record.properties.pk).isAfter(today);
                return isToday || isFuture;
            },
        },
        {
            title: 'Project',
            dataIndex: ['properties', 'project'],
            key: "properties['project']",
            render: (text: any, record: any) => {
                return (
                    <>
                        <a
                            href="#top"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedLocation(record);
                                gotoLocation({
                                    latitude: record.geometry.coordinates[1],
                                    longitude: record.geometry.coordinates[0],
                                    zoom: 12,
                                });
                                mapRef.current.scrollIntoView();
                            }}
                        >
                            <b>{record.properties.project}</b>
                        </a>
                    </>
                );
            },
        },
        {
            title: 'CREDIT',
            dataIndex: ['properties', 'credit'],
            key: "properties['credit']",
        },
        {
            title: 'Address',
            dataIndex: ['properties', 'address'],
            key: "properties['address']",
        },
        {
            title: 'website',
            dataIndex: ['properties', 'website'],
            key: "properties['website']",
            render: (text: any, record: any) => {
                return (
                    <>
                        <a
                            target="_blank"
                            href={record.properties.website}
                            rel="noreferrer"
                        >
                            IMDb
                        </a>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Table
                rowKey={(record) => record.properties.sk}
                columns={columns}
                dataSource={setLocation.features}
                pagination={{ pageSize: 5, position: ['topRight'] }}
                size="small"
                rowClassName={(record) =>
                    dayjs(record.properties.pk).isSame(today, 'day')
                        ? 'table-row-today'
                        : ''
                }
            />
        </>
    );
}

export default TableShowLocation;
