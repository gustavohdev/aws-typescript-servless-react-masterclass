import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
  
    new Bucket(this, "L3Bucket", {
      lifecycleRules:[{
        expiration: cdk.Duration.days(expiration)
      }]
    })

  }

}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new CfnBucket(this, "My L1Bucket", {
      lifecycleConfiguration:{
        rules:[{
          expirationInDays:1,
          status:"Enabled"
        }]
      }
    })
    
    const duration = new cdk.CfnParameter(this, "duration", {
      default: 6,
      minValue:1,
      maxValue: 10,
      type: "Number"

    })
    const myL2Bucket = new Bucket(this,"My L2Bucket", {
      lifecycleRules: [
        {expiration: cdk.Duration.days(duration.valueAsNumber)}
      ]
    })


    new L3Bucket(this, "My L3Bucket", 4)

    new cdk.CfnOutput(this, 'My L2Bucket Name', {
      value: myL2Bucket.bucketName
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkStarterQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
