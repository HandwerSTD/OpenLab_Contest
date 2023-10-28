import React, { useEffect } from 'react';
import './App.css';
import {Layout, Row, Col, Button, Table, Modal, Tooltip} from 'antd'
import {BarChartOutlined, ReloadOutlined} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { Column } from '@ant-design/plots';
import { useState } from 'react';

const {Header, Content, Footer} = Layout;

class ScoreType {
  level: number = 0
  score: number = 0
}
class DataType {
  name: string = ''
  id: number = 0
  score: ScoreType[] = []
}
class ProblemType {
    title: string = ''
    id: number = 0
}

class DataTable {
  name: string = ''
  id: number = 0
  score: Array<Array<number> > = []
  // score[problem id] = [score, completeTime, isFirst(1/0)]
  rank: number = 0
  total_score: number = 0
  key: number = 0

  constructor(data: DataType, completeTime: number) {
    this.name = data.name
    this.id = data.id
    data.score.forEach((value, index) => {
      this.score.push([value.score, completeTime, 0])
      this.total_score += value.score
    });
    this.key = completeTime
  }
}

class DataStatistics {
  tid: string = ''
  value: number = 0
  type: string = ''
}

const ProblemsIndex: ProblemType[] = [
    {title: 'T1', id: 0}, {title: 'T2', id: 1}, {title: 'T3', id: 2}, {title: 'T4', id: 3} 
]
const ColumnsDefault: ColumnsType<DataTable> = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: '学号',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '总成绩',
    dataIndex: 'total_score',
    key: 'total_score',
    fixed: 'left'
  }
]

function StatColumn(statsData: DataStatistics[]) {
    const columnPlot = {
        data: statsData,
        xField: 'tid',
        yField: 'value',
        seriesField: 'type',
        isStack: true
    }
    return <Column {...columnPlot} style={{width: '100%'}}/>
}


export default function App() {
    const [fetchData, setFetchedData] = useState([])

    let adaptedData: DataTable[] = []
    let statsData: DataStatistics[] = []
    let Columns:ColumnsType<DataTable> = []
    
    const [isModalOpen, setIsModalOpen] = useState(false)
        
    // onAppear
    useEffect(() => { refreshFetchData(setFetchedData) }, [])

    adaptedData = adaptToDataT(fetchData)
    statsData = generateStatistics(adaptedData)
    Columns = getProblemIndexes(ProblemsIndex)

    return (
        <div className="App">
        <Layout>
            <Header style={{
                backgroundColor: '#E5E5E5', 
                position: 'sticky', 
                top: 0, 
                zIndex: 1,
                width: '100%', 
                boxShadow: '0px 2px 10px 2px rgb(0,0,0,0.15)'
                }} >
                <Row style={{justifyContent: 'space-between', zIndex: 2}}>
                    <Col style={{fontSize: 25, color:'#000000', zIndex: 2, width: '30%'}}>Rank List</Col>
                    
                    <Col>
                        <Tooltip title='统计分析'>
                            <Button onClick={() => {setIsModalOpen(!isModalOpen)}} shape='circle' style={{marginRight: '10px'}}>
                                <BarChartOutlined />
                            </Button>
                        </Tooltip>
                        <Tooltip title='刷新'>
                            <Button onClick={() => {refreshFetchData(setFetchedData)}} shape='circle'>
                                <ReloadOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
            <Content style={{width: '80%', margin: 'auto', zIndex: 0}}>
            <Col style={{width:'100%'}}>
                <Modal 
                    title="统计分析" 
                    open={isModalOpen} 
                    onOk={() => {setIsModalOpen(false)}}
                    onCancel={() => {setIsModalOpen(false)}}
                    footer={[
                        <Button onClick={() => {setIsModalOpen(false)}} type='primary' key='confirm'>确定</Button>
                    ]}
                >
                    {StatColumn(statsData)}
                </Modal>
                <Table 
                    columns={Columns} 
                    dataSource={adaptedData} 
                    rowKey={(record) => record.rank} 
                    pagination={false}
                    style={{marginTop: 40, marginBottom: 40}}
                    />
            </Col>
            </Content>
            <Footer style={{position:'sticky'}}>
            <Row>Copyright (C) Handwer, 2023</Row>
            <Row><a href = 'mailto:handwer@qq.com'>Contact Mail: handwer@qq.com</a></Row>
            <Row>每题最快 AC 顺序以表单顺序为准</Row>
            </Footer>
        </Layout>
        </div>
    );
}

function refreshFetchData(setData: Function) {
    fetch('https://puzzle.qieee.top/api/rank/', {mode: 'cors'})
    .then((res) => { return res.json() })
    .then((res) => { setData(res); console.log(res) })
    .catch((e) => { console.log(e) })
}

function getProblemIndexes(problems: ProblemType[]): ColumnsType<DataTable> {
    let result: ColumnsType<DataTable> = []
    ColumnsDefault.forEach((value) => {
        result.push(value)
    })
    // console.log(problems)
    // console.log(ColumnsDefault);
    problems.forEach((value) => {
        result.push({
            title: value.title,
            dataIndex: ['score', `${value.id}`],
            key: `score${value.id}`,
            render: (data: any) => {
              return (
                <div style={{
                    color: (Number(data[0]) === 10 ? (Number(data[1]) === 0 ? '#BDDB69' : '#86AD53') : '#E84026'), 
                    fontWeight: 'bold',
                    backgroundColor: (Number(data[2]) === 1 ? '#5BA854' : '#ffffff00'),
                    margin: '0'
                  }}>
                  {data[0]}
                </div>
              )
            }
          })
    })
    // console.log(result)
    return result
}

function adaptToDataT(origin_data: DataType[]): DataTable[] {
  let data: DataTable[] = []
  origin_data.forEach((value, index, array) => {
    let this_data = new DataTable(value, index)
    data.push(this_data)
  })
  ProblemsIndex.forEach((value) => {
    let tid = value.id
    // 因为是时间是按榜单顺序假定的 所以也不用排序 本来就是升序的
    // data.sort((a, b) => {return a.score[tid][1] - b.score[tid][1]})
    for (let i = 0; i < data.length; ++i) {
        if (data[i].score[tid][0] === 10) {
            data[i].score[tid][2] = 1;
            break;
        }
    }
  })
  data.sort((a, b) => {return b.total_score - a.total_score})
  data.forEach((value, index) => {
    value.rank = index + 1
  })
  return data
}

function generateStatistics(adaptedData: DataTable[]): DataStatistics[] {
  let acs: Array<number> = []
  ProblemsIndex.forEach(() => {acs.push(0)})
  adaptedData.forEach((value) => {
    value.score.forEach((thisScore, index) => {
      acs[index] += ((thisScore[0] === 10) ? 1 : 0)
    })
  })
  let stats: DataStatistics[] = []
  acs.forEach((value, index) => {
    stats.push({
      tid: `T${index + 1}`, 
      value: value,
      type: 'AC'
    })
    stats.push({
      tid: `T${index + 1}`, 
      value: adaptedData.length - value,
      type: '非 AC'
    })
  })
  return stats
}