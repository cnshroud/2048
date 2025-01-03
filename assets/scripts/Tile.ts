import {
    _decorator,
    Component,
    Label,
    Node,
    resources,
    Sprite,
    SpriteFrame,
    tween,
    Vec3
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    @property(Sprite)
    titlebg: Sprite = null;
    @property(Label)
    titlelabel: Label = null;

    //加载背景的时候用
    private bgMap: { [key: number]: string } = {
        0: '0',
        2: '2',
        4: '4',
        8: '8',
        16: '16',
        32: '32',
        64: '64',
        128: '128',
        256: '256',
        512: '512',
        1024: '1024',
        2048: '2048',
        4096: '4096',
    }


    /**
     * 瓦片初始化，外部通过这个方来创建和设置瓦片,这个x,y是外面4*4二维数组传过来的，要在这里确定瓦片的位置
     */
    inittile(value: number, x: number, y: number) {
        this.setvalue(value);
        this.createTileAnimation();
        this.node.setPosition(this.setTilePosition(x, y));
        // console.log("初始化瓦片完成", this.node.getPosition());
    }


    /**
     * 设置瓦片位置,返回Vec3可以直接给setPosition用
     */
    setTilePosition(x: number, y: number) {
        /**
         * 大格子 800 * 800
         * 小格式 175 * 175
         * 四周的间隔 20
         * 开始位置是 0.5 * 175 + 20 = 107.5
         * 减去两边的间隔 800 - 20 * 2 = 760
         * 格子间间距（800 - 20 * 2） / 4 = 195 
         */
        return new Vec3(107.5 + 195 * x, 107.5 + 195 * y);
    }

    /**
     * 通过传入的值设置瓦片的背景和文本
     */
    setvalue(value: number) {
        //加载文本，当value为0的时候，说明是空白瓦片，不用文本
        if (value != 0) {
            this.titlelabel.string = value.toString();
        } else {
            this.titlelabel.string = '';
        }
        /**
         * 加载背景,必须要加/spriteFrame后缀,要不然加载不到
         * 不能加扩展名,要不然加载不到
         */
        resources.load(this.bgMap[value] + "/spriteFrame", SpriteFrame, (err: any, spriteFrame: SpriteFrame) => {
            // if (spriteFrame) {
            //     // console.log("加载成功", spriteFrame)
            // }
            this.titlebg.spriteFrame = spriteFrame;
            // console.log(this.titlebg.spriteFrame)
        });
    }

    /**
     * 创建瓦片动画
     */
    createTileAnimation() {
        //瓦片从0,0开始到默认大小
        this.node.setScale(0, 0);
        //缓动动画,0.1s完成，把节点的scale从0,0,0到1,1,1，动画曲线为backOut
        tween(this.node)
            .delay(0.2)
            .to(0.5, { scale: new Vec3(1, 1, 1) }, {
                easing: 'backOut'
            }).start();
        // console.log("创建瓦片动画完成");
    }


    /**
     * 移动瓦片动画
     */
    moveTileAnimation(x: number, y: number) {
        // console.log("移动瓦片动画");
        tween(this.node)
            .to(0.1, { position: this.setTilePosition(x, y) }, { easing: 'backOut' }).start()
        // console.log("移动瓦片动画完成");
    }

    /**
     * 瓦片消失动画,call可以添加一个 调用回调 的瞬时动作
     */
    distroyTileAnimation() {
        console.log("销毁瓦片动画");
        tween(this.node)
            .delay(0.1).call(() => {
                this.node.destroy();
            })
        console.log("销毁瓦片动画完成");
    }
}


