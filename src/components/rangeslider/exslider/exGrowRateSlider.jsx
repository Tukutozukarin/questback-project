import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';


const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class ExGrowRateSlider extends React.Component {
    state = {
        values: [50]
      };
      render() {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Range
              values={this.state.values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={values => this.setState({ values })}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '160px',
                    display: 'flex',
                    width: '85%'
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      marginTop: '70px',
                      height: '26px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: this.state.values,
                        colors: ['#1a757b', '#ccc'],
                        min: MIN,
                        max: MAX
                      }),
                      alignSelf: 'center'
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                  /* The button properties */
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '38px',
                    width: '42px',
                    borderRadius: '4px',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #f5f5f5',
                    border:'solid 5px #000',
                    opacity: 0.5,
                  }}
                >
                  <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#548BF4' : '#CCC'
                    }}
                  />
                </div>
              )}
            />
            <output style={{ 
                marginTop: '-160px', 
                fontWeight: 'bold', 
                fontSize: '32px', 
                color: '#7CFC00' 
            }} id="output">

              {this.state.values[0].toFixed(1)}
            </output>
          </div>
        );
      }
    }

export default ExGrowRateSlider;