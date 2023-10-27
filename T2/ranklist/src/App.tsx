import React from 'react';
import './App.css';
import {Layout, Row, Col, Button, Table, Modal} from 'antd'
import {BarChartOutlined} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { Column } from '@ant-design/plots';
import { useState } from 'react';

const {Header, Content, Footer} = Layout;

class ScoreType {
  level: number = 0
  score: number = 0
}
interface DataType {
  name: string,
  id: number,
  score: ScoreType[]
}

class DataTable {
  name: string = ''
  id: number = 0
  score: Array<Array<Number> > = []
  rank: number = 0
  total_score: number = 0
  key: number = 0

  constructor(data: DataType, completeIndex: number) {
    this.name = data.name
    this.id = data.id
    data.score.forEach((value, index) => {
      this.score.push([value.score, completeIndex])
      this.total_score += value.score
    });
    this.key = completeIndex
  }
}

interface DataStatistics {
  tid: string
  value: number
  type: string
}

const Columns: ColumnsType<DataTable> = [
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
  },
  {
    title: 'T1',
    dataIndex: ['score', '0'],
    key: 'score0',
    render: (data: any) => {
      return (
        <div style={{
            color: (Number(data[0]) === 10 ? (Number(data[1]) === 0 ? '#BDDB69' : '#86AD53') : '#E84026'), 
            fontWeight: 'bold',
            backgroundColor: (Number(data[1]) === 0 ? '#5BA854' : '#ffffff00'),
            margin: '0'
          }}>
          {data[0]}
        </div>
      )
    }
  },
  {
    title: 'T2',
    dataIndex: ['score', '1'],
    key: 'score1',
    render: (data: any) => {
      return (
        <div style={{
            color: (Number(data[0]) === 10 ? (Number(data[1]) === 0 ? '#BDDB69' : '#86AD53') : '#E84026'), 
            fontWeight: 'bold',
            backgroundColor: (Number(data[1]) === 0 ? '#5BA854' : '#ffffff00'),
            margin: '0'
          }}>
          {data[0]}
        </div>
      )
    }
  },
  {
    title: 'T3',
    dataIndex: ['score', '2'],
    key: 'score2',
    render: (data: any) => {
      return (
        <div style={{
            color: (Number(data[0]) === 10 ? (Number(data[1]) === 0 ? '#BDDB69' : '#86AD53') : '#E84026'), 
            fontWeight: 'bold',
            backgroundColor: (Number(data[1]) === 0 ? '#5BA854' : '#ffffff00'),
            margin: '0'
          }}>
          {data[0]}
        </div>
      )
    }
  },
  {
    title: 'T4',
    dataIndex: ['score', '3'],
    key: 'score3',
    render: (data: any) => {
      return (
        <div style={{
            color: (Number(data[0]) === 10 ? (Number(data[1]) === 0 ? '#BDDB69' : '#86AD53') : '#E84026'), 
            fontWeight: 'bold',
            backgroundColor: (Number(data[1]) === 0 ? '#5BA854' : '#ffffff00'),
            margin: '0'
          }}>
          {data[0]}
        </div>
      )
    }
  }
]


let fetchedData: DataType[] = [
  {
      "name": "叶静琪",
      "id": 2023553947,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "张冰颖",
      "id": 2023283917,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "莫彬华",
      "id": 2023541973,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "莫晋运",
      "id": 2023513887,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "秦涛胜",
      "id": 2023696864,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "何思芳",
      "id": 2023062630,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "侯鼎鸿",
      "id": 2023074527,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "梁雨双",
      "id": 2023622768,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "蔡鼎承",
      "id": 2023166158,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "邓雨双",
      "id": 2023628251,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "董红芳",
      "id": 2023018004,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "孟若菲",
      "id": 2023414932,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "余茹婕",
      "id": 2023299746,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "朱彬琪",
      "id": 2023549744,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "蒋鸿祥",
      "id": 2023810976,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "韦辰逸",
      "id": 2023976772,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "唐翠柳",
      "id": 2023074341,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "邵雅儿",
      "id": 2023972703,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 0
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 0
          }
      ]
  },
  {
      "name": "谭冰兰",
      "id": 2023833849,
      "score": [
          {
              "level": 0,
              "score": 10
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 0
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  },
  {
      "name": "袁珊缦",
      "id": 2023834614,
      "score": [
          {
              "level": 0,
              "score": 0
          },
          {
              "level": 1,
              "score": 10
          },
          {
              "level": 2,
              "score": 10
          },
          {
              "level": 3,
              "score": 10
          }
      ]
  }
]

function adaptToDataT(): DataTable[] {
  let data: DataTable[] = []
  fetchedData.forEach((value, index, array) => {
    let this_data = new DataTable(value, index)
    data.push(this_data)
  })
  data.sort((a, b) => {return b.total_score - a.total_score})
  data.forEach((value, index) => {
    value.rank = index + 1
  })
  return data
}

function generateStatistics(adaptedData: DataTable[]): DataStatistics[] {
  let acs: Array<number> = [0, 0, 0, 0]
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
      value: fetchedData.length - value,
      type: '非 AC'
    })
  })
  return stats
}

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

function App() {
    let adaptedData: DataTable[] = []
    let statsData: DataStatistics[] = []
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    adaptedData = adaptToDataT()
    statsData = generateStatistics(adaptedData)
    console.log(statsData)
    
    
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
                    <Col style={{fontSize: 20, color:'#000000', zIndex: 2, width: '30%'}}>Rank List</Col>
                    
                    <Col>
                        <Button onClick={() => {setIsModalOpen(!isModalOpen)}} shape='circle'>
                            <BarChartOutlined />
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{width: '80%', margin: 'auto', zIndex: 0}}>
            <Col style={{width:'100%'}}>
                <Modal title="统计分析" open={isModalOpen} onOk={() => {setIsModalOpen(false)}}>
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

export default App;
