import {
    _decorator,
    AudioSource,
    Color,
    Component,
    instantiate,
    Label,
    log,
    Node,
    Prefab,
    Sprite,
    SpriteFrame,
    TiledLayer,
    Vec2
} from 'cc';
import { GRID_SIZE } from './Const';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {

    //分数文本
    @property(Label)
    label: Label = null;
    //最高分文本
    @property(Label)
    maxlabel: Label = null;
    ///滑动节点，只有在这个节点范围内的滑动才有效
    @property(Node)
    touch: Node = null;
    //瓦片父类
    @property(Node)
    gaid: Node = null;
    //瓦片预制体
    @property(Prefab)
    tilePrefab: Prefab = null;

    //全局音效
    @property(AudioSource)
    audio: AudioSource = null;

    //瓦片值,类型为number的二维数组，用来存储所有的瓦片的位置
    private tileValue: number[][] = [];

    //类型为node的二维数组，用来存储所有的瓦片信息
    private tiles: Node[][] = [];

    start() {
        this.initData() //初始化数据
        this.setbgTile()    //设置背景格子
        this.initRandonNumber() //开局随机生成两个瓦片
    }

    /**
     * 初始化数据
     */
    initData() {
        this.label.string = "0";
        for (let i = 0; i < GRID_SIZE; i++) {
            //先给二维数组赋值为空,不然之后调用值为undefined
            this.tileValue[i] = [];
            this.tiles[i] = [];
            for (let j = 0; j < GRID_SIZE; j++) {
                this.tileValue[i][j] = 0;
                this.tiles[i][j] = null;

            }

        }

    }


    /**
     * 设置背景格子,因为背景格子是空格子，所以value参数是0
     */
    setbgTile() {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                //拿着i和j去创建瓦片
                this.createTile(0, i, j);
            }

        }
    }

    /**
     * 创建瓦片
     */
    createTile(value: number, x: number, y: number) {
        //创建瓦片
        let tile = instantiate(this.tilePrefab);
        let tileScript = tile.getComponent(Tile)
        //调用瓦片初始化方法，传入值和位置
        tileScript.inittile(value, x, y);
        this.gaid.addChild(tile);
        //把瓦片添加到数组中
        this.tiles[x][y] = tile;
        //把瓦片的值添加到数组中
        this.tileValue[x][y] = value;
    }

    /**
     * 初始化，开局随机生成两个数字
     */
    initRandonNumber() {
        for (let i = 0; i < 2; i++) {
            this.randomNumber()
        }
    }

    /**
     * 随机位置生成随机数字的瓦片
     */
    randomNumber() {
        let value = Math.random() > 0.5 ? 2 : 4
        //保存空格子的数组
        let nullgridsList: Vec2[] = []
        //拿到所有空格子
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                //如果这个格子的值为0，那么就是空格子
                if (this.tileValue[i][j] == 0) {
                    nullgridsList.push(new Vec2(i, j))
                }
            }
        }
        //在数组中随机选一个空格子
        let nullgrid = nullgridsList[Math.floor(Math.random() * nullgridsList.length)]
        //创建格子
        console.log(nullgrid)
        this.createTile(value, nullgrid.x, nullgrid.y)
    }


}


