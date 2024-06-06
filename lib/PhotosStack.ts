import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class PhotosStack extends cdk.Stack {

    private stackSuffix: string;
    public readonly photosBucketArn: string

    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id)

        this.initializeSuffix();

        const myBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `mycrazybucket-${this.stackSuffix}`
        })

        this.photosBucketArn = myBucket.bucketArn



        // you can not change the logicalId without deleting the last one
        // with the same name
        // if changes logicalID ( Photos Bucket), you would need to use
        // a code here or delete manually
        // if the name of the bucket changes, it's okay, because it's lose a reference



       //(myBucket.node.defaultChild as CfnBucket) override Logical id

    }

    private initializeSuffix(){
        const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId))
        this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId))
    }
}